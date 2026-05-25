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
            game.activeConditions[effect.condition] = game.activeConditions[effect.condition] || { duration: 0, strength: 1 };
            game.activeConditions[effect.condition].duration += effect.duration;
            break;
        case "changeConditionStrength":
            if (!game.activeConditions[effect.condition]) break;
            game.activeConditions[effect.condition].strength += effect.multiplier;
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
    let scaledEffect = structuredClone(effect);
    switch (scaledEffect.type) {
        case "grantSkillXp":
            scaledEffect.baseAmount *= multiplier;
            break;
        case "skillXpMultiplier":
            scaledEffect.multiplier *= multiplier;
            break;
        case "changeAttribute":
            scaledEffect.flat *= multiplier;
            scaledEffect.multiplier *= multiplier;
            break;
        case "applyCondition":
            scaledEffect.duration *= multiplier;
            break;
        case "conditionStrength":
            scaledEffect.multiplier *= multiplier;
            break;
        case "changeResource":
            scaledEffect.amount *= multiplier;
            break;
        default:
            console.warn("Cannot change effect strength of:", effect);
    }
    return scaledEffect;
}

export function applyScaledEffect(game, effect, strength) {
    const scaledEffect = changeEffectStrength(game, effect, strength);
    applyEffect(game, scaledEffect);
}