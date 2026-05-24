import { meetsRequirements } from "./requirements.js";
import { applyEffect } from "./effects.js";
import { EFFECTS } from "../data/effectsData.js";
import { applyCondition } from "./conditions.js";

export const evt = {
  resourceDropsBelowThreshold: (resource, threshold) => ({
    type: "resourceDropsBelowThreshold",
    resource,
    threshold,
  }),

  resourceChanges: (resource) => ({
    type: "resourceChanges",
    resource,
  }),

  locationChanges: (location) => ({
    type: "locationChanges",
    location,
  }),

  attributeReachesThreshold: (attribute, threshold) => ({
    type: "attributeReachesThreshold",
    attribute,
    threshold,
  }),

  conditionApplied: (condition) => ({
    type: "conditionApplied",
    condition,
  }),

  tick: () => ({
    type: "tick",
  })
};

export const eventHandlers = {
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

function checkEventConditions(game, previousState) {
  const triggeredEvents = [];
  for (const conditionId in game.activeConditions) {
    const condition = EFFECTS[conditionId];
    if (!Array.isArray(condition.event)) continue;
    if (!meetsRequirements(game, condition)) continue;

    for (const triggerEvent of condition.event) {
      const handler = eventHandlers[triggerEvent.type];
      if (!handler) console.warn("Condition trigger event has no handler: ", triggerEvent);
      if (handler(game, triggerEvent, previousState)) {
        triggeredEvents.push(conditionId);
        break;
      }
    } 


  }

  return triggeredEvents;
}


export function processEventQueue(game, previousState) {
  const eventQueue = [];
  
  // Initial check
  eventQueue.push(...checkEventConditions(game, previousState));

  // Process queue - effects may trigger new events
  while (eventQueue.length > 0) {
    const triggeredCondition = eventQueue.shift();
    const stateBeforeEffect = JSON.parse(JSON.stringify(game));
    applyCondition(game, triggeredCondition);
    
    // Check for newly triggered events after effects applied
    const newEvents = checkEventConditions(game, stateBeforeEffect);
    eventQueue.push(...newEvents);
  }
}
