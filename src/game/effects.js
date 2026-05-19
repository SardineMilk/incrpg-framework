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

import { grantSkillXp } from "./skills.js";

// Object that has functions as parameters that return standard structured object which can be used by applyEffect
export const eff = {
    grantSkillXp: (skill, baseAmount) => ({
        type: "grantSkillXp",
        skill,
        baseAmount,
    }),

    skillMultiplier: (skill, multiplier) => ({
        type: "skillMultiplier",
        skill,
        multiplier,
    }),

    changeStat: (stat, flat = 0, multiplier = 1) => ({
        type: "changeStat",
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
};


export function applyEffect(game, effect) {
    switch (effect.type) {
        case "grantSkillXp":
            grantSkillXp(game, effect.skill, effect.baseAmount);
            break;
        case "skillMultiplier":
            game.skills = game.skills || {};
            game.skills[effect.skill] = game.skills[effect.skill] || { multiplier: 1 };
            game.skills[effect.skill].multiplier += effect.multiplier;
            break;
        case "changeStat":
            game.attributes = game.attributes || {};
            game.attributes[effect.stat] = game.attributes[effect.stat] || { base: 0, multiplier: 1 };
            game.attributes[effect.stat].base += effect.flat;
            game.attributes[effect.stat].multiplier *= effect.multiplier;
            break;
        case "applyCondition":
            game.activeConditions = game.activeConditions || {};
            game.activeConditions[effect.condition] = effect.duration;
            break;
        case "conditionStrength":
            game.conditionStrengths = game.conditionStrengths || {};
            game.conditionStrengths[effect.condition] = (game.conditionStrengths[effect.condition] || 1) * effect.multiplier;
            break;
        case "changeResource":
            game.resources = game.resources || {};
            game.resources[effect.resource] = game.resources[effect.resource] || { current: 0 };
            game.resources[effect.resource].current += effect.amount;
            break;
        case "setLocation":
            game.location = effect.location;
            break;
        case "sendMessage":
            console.log(`${effect.category}: ${effect.message}`);
            break;
        default:
            console.warn("Unknown effect type:", effect.type);
    }
}