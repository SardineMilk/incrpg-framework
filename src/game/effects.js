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

    changeConditionStrength: (condition, multiplier) => ({
        type: "changeConditionStrength",
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

    setActiveAction: (action) => ({
        type: "setActiveAction",
        action,
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
            break;
        case "changeConditionStrength":
            game.conditionStrengths[effect.condition] = game.conditionStrengths[effect.condition] || 1
            game.conditionStrengths[effect.condition] += effect.multiplier;
            break;
        case "changeResource":
            game.resources[effect.resource].current += effect.amount;
            break;
        case "setLocation":
            game.location = effect.location;
            break;
        case "sendMessage":
            game.log.append(
                LogType.ACTION,
                effect.message,
            );
            console.log(`${effect.category}: ${effect.message}`);
            break;
        case "addEventEffect":
            game.eventEffects[effect.event] = game.eventEffects[effect.event] || [];
            game.eventEffects[effect.event].push(effect.effect);
            break;
        case "setActiveAction":
            game.activeAction = effect.action;
            break;  
        default:
            console.warn("Unknown effect type:", effect.type);
    }
}


export function changeEffectStrength(game, effect, multiplier) {
    switch (effect.type) {
        case "grantSkillXp":
            effect.baseAmount *= multiplier;
            break;
        case "skillXpMultiplier":
            effect.multiplier *= multiplier;
            break;
        case "changeAttribute":
            effect.flat *= multiplier;
            effect.multiplier *= multiplier;
            break;
        case "applyCondition":
            effect.duration *= multiplier;
            applyConditionEffects(game, effect);
            break;
        case "conditionStrength":
            effect.multiplier *= multiplier;
            break;
        case "changeResource":
            effect.amount *= multiplier;
            break;
        default:
            console.warn("Cannot change effect strength of:", effect);
    }
}

