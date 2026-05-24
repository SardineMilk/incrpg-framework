import { EFFECTS } from "../data/effectsData.js";
import { changeEffectStrength, applyEffect } from "./effects.js";


export function applyConditions(game) {
    // Resolve all condition strength modifiers first
    for (const conditionId in game.activeConditions) {
        const data = EFFECTS[conditionId];
        if (data.event) continue;
        
        for (const effect of data.effects) {
            if (effect.type === "changeConditionStrength") {
                applyEffect(game, effect);
            }
        }
    }

    // Apply non-strength effects
    for (const conditionId in game.activeConditions) {
        if (EFFECTS[conditionId].event) return;
        applyCondition(game, conditionId);
    }
}

export function applyCondition(game, conditionId) {
        const data = EFFECTS[conditionId];
        
        for (const effect of data.effects) {
            if (effect.type !== "changeConditionStrength") {
                const scaledEffect = { ...effect };
                const strength = game.activeConditions[conditionId].strength ?? 1;
                if (strength != 1) changeEffectStrength(game, scaledEffect, strength);
                applyEffect(game, scaledEffect);
            }
        }
}