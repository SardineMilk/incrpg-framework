
import { LogType } from "./log.js";
import { grantSkillXp } from "./skills.js";
import { processEffectEvents } from "./events.js";
import { CONDITIONS } from "../data/conditionsData.js";
import { eff } from "../data/structure.js";

function resolve(game, value) {
    if (typeof value === "function") {
        console.log(value, value(game))

        return value(game);
    }

    return value;
}


export function applyEffect(game, effect) {

    switch (effect.type) {
        case "grantSkillXp": {
            const skill = resolve(game, effect.skill);
            const amount = resolve(game, effect.amount);
            if (skill == null) break;
            grantSkillXp(game, skill, amount);
            break;
        }

        case "skillXpMultiplier": {
            const skill = resolve(game, effect.skill);
            const amount = resolve(game, effect.amount);

            game.skills[skill].multiplier += amount;
            break;
        }

        case "skillLevelBonus": {
            const skill = resolve(game, effect.skill);
            const flat = resolve(game, effect.flat);
            const multiplier = resolve(game, effect.multiplier);

            game.skills[skill].bonus.flat += flat;
            game.skills[skill].bonus.multiplier += multiplier;
            break;
        }

        case "applyCondition": {
            const condition = resolve(game, effect.condition);
            const amount = resolve(game, effect.amount);

            game.activeConditions[condition] =
                game.activeConditions[condition] || { strength: 1 };

            if (amount == null) break;

            game.activeConditions[condition].duration =
                game.activeConditions[condition].duration || 0;

            game.activeConditions[condition].duration += amount;

            break;
        }

        case "changeConditionStrength": {
            const condition = resolve(game, effect.condition);
            const amount = resolve(game, effect.amount);

            if (!game.activeConditions[condition]) break;

            game.activeConditions[condition].strength += amount;
            break;
        }

        case "changeConditionTagStrength": {
            const tag = resolve(game, effect.tag);
            const amount = resolve(game, effect.amount);

            for (const conditionId in game.activeConditions) {
                const tags = CONDITIONS[conditionId].tags;

                if (!tags) continue;

                if (tags.includes(tag)) {
                    game.activeConditions[conditionId].strength += amount;
                }
            }

            break;
        }

        case "changeResource": {
            const resource = resolve(game, effect.resource);
            const amount = resolve(game, effect.amount);

            game.resources[resource].current += amount;
            break;
        }

        case "setResource": {
            const resource = resolve(game, effect.resource);
            const amount = resolve(game, effect.amount);

            game.resources[resource].current = amount;
            break;
        }

        case "setLocation": {
            game.location = resolve(game, effect.location);
            break;
        }

        case "sendMessage": {
            //console.log(resolve(game, effect.message));
            game.log.append(
                LogType.ACTION,
                resolve(game, effect.message),
            );

            break;
        }

        case "setActiveAction": {
            game.activeAction = resolve(game, effect.action);
            break;
        }

        case "tick":
            game.tick++;
            break;

        case "presentChoice": {
            game.log.append(
                LogType.ACTION,
                resolve(game, effect.options),
            );

            break;
        }

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