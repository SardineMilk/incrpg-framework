
import { LogType } from "./log.js";
import { grantSkillXp } from "./skills.js";
import { processEffectEvents } from "./events.js";
import { CONDITIONS } from "../data/conditionsData.js";
import { eff } from "../data/structure.js";

export function applyEffect(game, effect) {
    switch (effect.type) {
        case "grantSkillXp":
            grantSkillXp(game, effect.skill, effect.amount);
            break;
        case "skillXpMultiplier":
            game.skills[effect.skill].multiplier += effect.amount;
            break;
        case "changeAttribute":
            game.attributes[effect.attribute].flat += effect.flat;
            game.attributes[effect.attribute].multiplier += effect.multiplier;
            break;
        case "applyCondition":
            game.activeConditions[effect.condition] = game.activeConditions[effect.condition] || { strength: 1 };
            if (effect.duration == null) break;
            game.activeConditions[effect.condition].duration = game.activeConditions[effect.condition].duration || 0;
            game.activeConditions[effect.condition].duration += effect.duration;
            break;
        case "changeConditionStrength":
            if (!game.activeConditions[effect.condition]) break;
            game.activeConditions[effect.condition].strength += effect.amount;
            break;
        case "changeConditionTagStrength":
            for (const conditionId in game.activeConditions) {
                const tags = CONDITIONS[conditionId].tags;
                if (tags == undefined) continue;
                if (tags.includes(effect.tag)) {
                    game.activeConditions[conditionId].strength += effect.amount;
                }
            }
            break;
        case "changeResource":
            game.resources[effect.resource].current += effect.amount; 
            break;
        case "setResource":
            game.resources[effect.resource].current = effect.amount;
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
        case "setActiveAction":
            game.activeAction = effect.action;
            break;  
        case "tick":
            game.tick++;
            break;
        case "presentChoice":
            game.log.append(
                LogType.ACTION,
                effect.options,
            );
            break;
        default:
            console.warn("Unknown effect type:", effect.type);
    }
    processEffectEvents(game, effect);
}


export function changeEffectStrength(game, effect, multiplier) {
    let scaledEffect = structuredClone(effect);
    switch (scaledEffect.type) {
        case "grantSkillXp":
            scaledEffect.amount *= multiplier;
            break;
        case "skillXpMultiplier":
            scaledEffect.amount *= multiplier;
            break;
        case "changeAttribute":
            scaledEffect.flat *= multiplier;
            scaledEffect.multiplier *= multiplier;
            break;
        case "applyCondition":
            if (scaledEffect.duration == null) break;
            scaledEffect.duration *= multiplier;
            break;
        case "changeConditionStrength":
            scaledEffect.amount *= multiplier;
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