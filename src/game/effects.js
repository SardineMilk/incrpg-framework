import { LogType } from "./log.js";
import { grantSkillXp } from "./skills.js";
import { processEffectEvents } from "./events.js";
import { CONDITIONS } from "../data/conditionsData.js";

function resolve(game, value) {
    return typeof value === 'function' ? value(game) : value;
}

function resolveEffect(game, effect) {
    const e = { ...effect };
    for (const [key, val] of Object.entries(e)) {
        if (key !== "type") e[key] = resolve(game, val);
    }
    return e;
}

export function applyEffect(game, effect) {
    let doTrigger = true;
    const e = resolveEffect(game, effect);

    switch (e.type) {
        case "grantSkillXp":
            if (e.skill == null) { doTrigger = false; break; }
            grantSkillXp(game, e.skill, e.amount);
            break;

        case "skillXpMultiplier":
            game.skills[e.skill].multiplier += e.amount;
            break;

        case "skillLevelBonus":
            game.skills[e.skill].bonus.flat       += e.flat;
            game.skills[e.skill].bonus.multiplier += e.multiplier;
            break;

        case "applyCondition":
            game.activeConditions[e.condition] =
                game.activeConditions[e.condition] || { strength: 1 };
            if (e.amount == null) { doTrigger = false; break; }
            game.activeConditions[e.condition].duration =
                game.activeConditions[e.condition].duration || 0;
            game.activeConditions[e.condition].duration += e.amount;
            break;

        case "changeConditionStrength":
            if (!game.activeConditions[e.condition]) break;
            game.activeConditions[e.condition].strength += e.amount;
            break;

        case "changeConditionTagStrength":
            for (const conditionId in game.activeConditions) {
                const tags = CONDITIONS[conditionId].tags;
                if (tags?.includes(e.tag))
                    game.activeConditions[conditionId].strength += e.amount;
            }
            break;

        case "changeResource":
            game.resources[e.resource].current += e.amount;
            break;

        case "setResource":
            game.resources[e.resource].current = e.amount;
            break;

        case "setLocation":
            game.location = e.location;
            break;

        case "sendMessage":
            // TODO remove stupid LogType thing
            game.log.append(LogType.ACTION, e.message);
            break;

        case "setActiveAction":
            game.activeAction = e.action;
            break;

        case "tick":
            game.tick++;
            break;

        case "presentChoice":
            // TODO hook into UI
            game.log.append(LogType.ACTION, e.options);
            break;

        case "setFlag":
            game.flags[e.flag] = e.value;
            break;

        default:
            console.warn("Unknown effect type:", e.type);
    }

    if (!doTrigger) return;
    processEffectEvents(game, e);
}

export function changeEffectStrength(game, effect, multiplier) {
    const scaledEffect = { ...effect };
    switch (scaledEffect.type) {
        // TODO add all effects that make sense
        case "grantSkillXp":
        case "skillXpMultiplier":
        case "changeConditionStrength":
        case "changeResource":
            scaledEffect.amount = (val) => resolve(game, effect.amount) * multiplier;
            break;
        case "applyCondition":
            if (scaledEffect.duration == null) break;
            scaledEffect.duration = (val) => resolve(game, effect.duration) * multiplier;
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