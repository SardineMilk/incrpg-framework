import { SKILLS } from "../data/skillsData.js";
import { ACTIONS } from "../data/actionsData.js";
import { CONDITIONS } from "../data/conditionsData.js";
import { TRAITS } from "../data/traitsData.js";
import { applyEffect } from "../game/effects.js";


function calculateActionSkillFactor(game, action) {
  let factor = 1;
  for (const [skill, skillFactor] of Object.entries(action.skills)) {
    factor += game.skills[skill].level * skillFactor * 0.01;
  }

  return factor;
}

function calculateActionAttributeFactor(game, action) {
  let factor = 1;
  for (const [attribute, attributeFactor] of Object.entries(action.attributes)) {
    factor += game.attributes[attribute].value * attributeFactor * 0.01;
  }
  return factor;
}

export function calculateActionsCompetency(game) {
    for (const action in ACTIONS) {
        game.actions[action] = game.actions[action] || {progress: 0, completions: 0, competency: 1}; 
        const skillFactor = calculateActionSkillFactor(game, ACTIONS[action])
        const attributeFactor = calculateActionAttributeFactor(game, ACTIONS[action]);
        game.actions[action].competency = skillFactor + attributeFactor;
    }
}


export function applyTraitEffects(game) {
    for (const trait of game.traits) {
        for (const effect of TRAITS[trait].effects) {
            applyEffect(game, effect);
        }
    }
}


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