import { CONDITIONS } from "../data/conditionsData.js";
import { applyEffect, applyScaledEffect } from "./effects.js";
import { meetsRequirements } from "./requirements.js";

function processTrigger(game, triggerType, context) {
    for (const [id, state] of Object.entries(game.activeConditions)) {
        const conditionDef = CONDITIONS[id];
        if (!conditionDef.triggers) continue;

        const matchingTriggers = conditionDef.triggers.filter(t => t.type === triggerType);
        if (!matchingTriggers.length) continue;
        if (!matchingTriggers.some(t => checkTrigger(t, context))) continue;

        if (!meetsRequirements(game, conditionDef)) continue;

        for (const effect of conditionDef.effects) {
            if (state.strength != 1) applyScaledEffect(game, effect, state.strength);
            else applyEffect(game, effect);
        }
    }
}

function checkTrigger(trigger, context) {
    switch (trigger.type) {
        case "resourceGain":
            return context.resource === trigger.resource && context.amount >= trigger.min;
        case "resourceLoss":
            return context.resource === trigger.resource && context.amount <= -trigger.min;
        case "gainSkillXp":
            return context.skill === trigger.skill;
        case "locationChanges":
            if (trigger.tags.length === 0) return true;
            return trigger.tags.every(tag => context.tags?.includes(tag));
        case "conditionApplied":
            return context.condition === trigger.condition;
        case "actionChanges":
            return true;
        case "tick":
            return true;
        default:
            return false;
    }
}

export function processEffectEvents(game, effect) {
    switch (effect.type) {
        case "grantSkillXp":
            processTrigger(game, "gainSkillXp", { skill:effect.skill });
            break;
        case "applyCondition":
            processTrigger(game, "conditionApplied", { condition:effect.condition });
            break;
        case "changeResource":
            if (effect.amount > 0)
                processTrigger(game, "resourceGain", { resource:effect.resource, amount:effect.amount });
            else if (effect.amount < 0)
                processTrigger(game, "resourceLoss", { resource:effect.resource, amount:effect.amount });
            break;
        case "setLocation":
            processTrigger(game, "locationChanges", { tags:effect.tags });
            break;
        case "setActiveAction":
            processTrigger(game, "actionChanges", {});
            break;
        case "tick":
            processTrigger(game, "tick", {});
            break;
    }
}