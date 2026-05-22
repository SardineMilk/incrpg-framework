import { eff } from "./effects.js";
import { CONDITIONS } from "../data/conditionsData.js";

export function applyConditionEffects(game, condition) {
    for (const effect in CONDITIONS[condition].effects) {
        // TODO apply condition strength
        conditionStrength = game.conditionStrengths[condition];
        applyEffect(game, effect);
    }
}

