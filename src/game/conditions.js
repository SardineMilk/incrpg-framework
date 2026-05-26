import { CONDITIONS } from "../data/conditionsData.js";
import { applyScaledEffect, applyEffect } from "./effects.js";
import { meetsRequirements } from "./requirements.js"




export function processConditions(game) {

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
    
    // Dont apply conditions with triggers
    if (conditionDef.triggers) continue;
    for (const effect of conditionDef.effects) {
        if (effect.type !== "changeConditionStrength") continue;  // only strength modifiers 
        applyEffect(game, effect);
    }
  }

  // Apply all other effects
  for (const [id, state] of Object.entries(game.activeConditions)) {
    const conditionDef = CONDITIONS[id];

    // Dont apply conditions with triggers
    if (conditionDef.triggers) continue;
    for (const effect of conditionDef.effects) {
        if (effect.type === "changeConditionStrength") continue; // already handled
        if (!meetsRequirements(game, conditionDef)) continue;
      
        if (state.strength != 1) applyScaledEffect(game, effect, state.strength);
        else applyEffect(game, effect);
        
    }
  }

}
