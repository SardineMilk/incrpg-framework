/*
Conditions, actions and traits apply effects to the game state.
These are represented using the `eff` framework.
`eff.doThing(...args)`
These are then activated using the `applyEffect()` function
by whatever portion of the game loop processes that data.

Example:
Trait effects are applied once when first gained
Action tick effects and result effects are applied by the tick functions as required
*/

import { LogType } from "./log.js";
import { grantSkillXp } from "./skills.js";

// Object that has functions as parameters that return standard structured object which can be used by applyEffect
export const eff = {
    grantSkillXp: (skill, baseAmount) => ({
        type: "grantSkillXp",
        skill,
        baseAmount,
    }),

    skillXpMultiplier: (skill, multiplier) => ({
        type: "skillXpMultiplier",
        skill,
        multiplier,
    }),

    changeAttribute: (stat, flat = 0, multiplier = 0) => ({
        type: "changeAttribute",
        stat,
        flat,
        multiplier,
    }),

    applyCondition: (condition, duration) => ({
        type: "applyCondition",
        condition,
        duration,
    }),

    conditionStrength: (condition, multiplier) => ({
        type: "conditionStrength",
        condition,
        multiplier,
    }),

    changeResource: (resource, amount) => ({
        type: "changeResource",
        resource,
        amount,
    }),

    setLocation: (location) => ({
        type: "setLocation",
        location,
    }),

    sendMessage:(category, message) => ({
        type: "sendMessage",
        category, 
        message,
    }),

    addEventEffect: (event, effect) => ({
        type: "addEventEffect",
        event,
        effect,
    }),
};


export function applyEffect(game, effect) {
    switch (effect.type) {
        case "grantSkillXp":
            grantSkillXp(game, effect.skill, effect.baseAmount);
            break;
        case "skillXpMultiplier":
            game.skills[effect.skill].multiplier += effect.multiplier;
            break;
        case "changeAttribute":
            game.attributes[effect.attribute].flat += effect.flat;
            game.attributes[effect.attribute].multiplier += effect.multiplier;
            break;
        case "applyCondition":
            game.activeConditions[effect.condition] ??= 0;
            game.activeConditions[effect.condition] += effect.duration;
            applyConditionEffects(game, effect);
            break;
        case "conditionStrength":
            game.conditionStrengths[effect.condition] = (game.conditionStrengths[effect.condition] || 1) * effect.multiplier;
            break;
        case "changeResource":
            game.resources[effect.resource].current += effect.amount;
            break;
        case "setLocation":
            game.location = effect.location;
            break;
        case "sendMessage":
            game.log.append({
                type: LogType.ACTION,
                text: effect.message,
            });
            console.log(`${effect.category}: ${effect.message}`);
            break;
        case "addEventEffect":
            game.eventEffects = game.eventEffects || {};
            game.eventEffects[effect.event] = game.eventEffects[effect.event] || [];
            game.eventEffects[effect.event].push(effect.effect);
            break;
        default:
            console.warn("Unknown effect type:", effect.type);
    }
}


export function changeEffectStrength(game, effect) {

}

