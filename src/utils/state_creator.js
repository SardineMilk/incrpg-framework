import { SKILLS } from "../data/skillsData.js";
import { ACTIONS } from "../data/actionsData.js";


export function initialiseState(game) {
    game.skills = game.skills || {};
    for (const skill in SKILLS) {
        game.skills[skill] = game.skills[skill] || { xp: 0, level: 0, multiplier: 1 };
    }

    game.actions = game.actions || {};
    for (const action in ACTIONS) {
        game.actions[action] = game.actions[action] || { progress: 0, completions: 0, competency: 1 };
    }
}