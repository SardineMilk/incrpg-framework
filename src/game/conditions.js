import { EFFECTS } from "../data/effectsData.js";
import { applyEffect } from "./effects.js";

export function applyConditionEffects(game, condition) {
    let conditionStrength = game.activeConditions[condition].strength;
    for (const effect of EFFECTS[condition].effects) {
        // TODO apply condition strength
        applyEffect(game, effect);
    }
}

