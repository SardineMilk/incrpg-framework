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

    skillXpMultiplier: (skill, multiplier) => ({
        type: "skillXpMultiplier",
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
            applyConditionEffects(game, effect);
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
        case "addEventEffect":
            game.eventEffects = game.eventEffects || {};
            game.eventEffects[effect.event] = game.eventEffects[effect.event] || [];
            game.eventEffects[effect.event].push(effect.effect);
            break;
        default:
            console.warn("Unknown effect type:", effect.type);
    }
}

export function removeEffect(game, effect) {
    switch (effect.type) {
        case "skillXpMultiplier":
            effect.multiplier = 1 - effect.multiplier;
            applyEffect(game, effect);
            break;
        case "changeStat":
            effect.flat = -effect.flat;
            effect.multiplier = 1 - effect.multiplier;
            applyEffect(game, effect);
            break;
        case "applyCondition":
            game.activeConditions.remove(effect.condition);
            removeConditionEffects(game, effect);
            break;
        case "conditionStrength":
            break;
        default:
            console.log(`Cannot remove effect: `, effect);
    }
}



