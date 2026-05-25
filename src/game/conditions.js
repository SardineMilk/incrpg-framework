import { CONDITIONS } from "../data/conditionsData.js";
import { applyScaledEffect, applyEffect } from "./effects.js";
import { meetsRequirements } from "./requirements.js"

const eventHandlers = {
  resourceDropsBelowThreshold: (game, condition, previousState) => {
    const current = game.resources[condition.resource].current;
    const previous = previousState.resources[condition.resource].current;
    return previous >= condition.threshold && current < condition.threshold;
  },

  resourceChanges: (game, condition, previousState) => {
    return game.resources[condition.resource].current !== previousState.resources[condition.resource].current;
  },

  locationChanges: (game, condition, previousState) => {
    return game.location !== previousState.location;
  },

  attributeReachesThreshold: (game, condition, previousState) => {
    const current = game.attributes[condition.attribute].value;
    const previous = previousState.attributes[condition.attribute].value;
    return previous < condition.threshold && current >= condition.threshold;
  },

  conditionApplied: (game, condition, previousState) => {
    return game.activeConditions[condition.condition] && !previousState.activeConditions[condition.condition];
  },

  tick: (game, condition, previousState) => {
    return game.tick !== previousState.tick;
  },
};



export function processNonEventConditions(game) {

  // Tick down durations, remove expired conditions, reset strengths
  for (const [id, state] of Object.entries(game.activeConditions)) {
    state.strength = 1;
    if (state.duration !== undefined) {
      if (state.duration <= 0) { delete game.activeConditions[id]; continue; }
      state.duration -= 1;
    }
  }


  // Apply all strength modifiers
  for (const [id, state] of Object.entries(game.activeConditions)) {
    const conditionDef = CONDITIONS[id];

    if (conditionDef.event) continue;
    for (const effect of conditionDef.effects) {
        if (effect.type !== "changeConditionStrength") continue;  // only strength modifiers 
        applyEffect(game, effect);
    }
  }

  // Apply all other effects
  for (const [id, state] of Object.entries(game.activeConditions)) {
    const conditionDef = CONDITIONS[id];

    // Dont apply conditions with events
    if (conditionDef.event) continue;

    for (const effect of conditionDef.effects) {
        if (effect.type === "changeConditionStrength") continue; // already handled
        if (!meetsRequirements(game, conditionDef)) continue;
      
        if (state.strength != 1) applyScaledEffect(game, effect, state.strength);
        else applyEffect(game, effect);
        
    }
  }

}

export function processEventConditions(game, prev) {


  // Apply every other effect
  for (const [id, state] of Object.entries(game.activeConditions)) {
    const conditionDef = CONDITIONS[id];
    
    // If it has a event, check it
    if (!conditionDef.event) continue;

    let isTriggered = false;
    for (const trigger of conditionDef.event) {
        const handler = eventHandlers[trigger.type];
        if (!handler(game, trigger, prev)) continue;
        if (!meetsRequirements(game, conditionDef)) continue;
        
        isTriggered = true;
        break;
    }
    if (!isTriggered) continue;
    

    for (const effect of conditionDef.effects) {
        if (effect.type === "changeConditionStrength") console.warn("Event condition changing condition strength is undefined behaviour: ", conditionDef); 
        if (state.strength != 1) applyScaledEffect(game, effect, state.strength);
        else applyEffect(game, effect);
    }
  }
}