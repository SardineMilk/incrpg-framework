import { eff } from "./effects";

export function applyConditionEffects(game, condition) {
    for (const effect in CONDITIONS[condition].effects) {
        // TODO apply condition strength
        conditionStrength = game.conditionStrengths[condition];
        applyEffect(game, effect);
    }
    
}


export function removeConditionEffects(game, condition) {
    for (const effect in CONDITIONS[condition].effects) {
        // TODO apply condition strength
        conditionStrength = game.conditionStrengths[condition];
        removeEffect(game, effect);
    }
}
