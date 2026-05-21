import { SKILLS } from "../data/skillsData.js";
import { ACTIONS } from "../data/actionsData.js";
import { CONDITIONS } from "../data/conditionsData.js";
import { TRAITS } from "../data/traitsData.js";
import { applyEffect } from "../game/effects.js";

function calculateActionSkillFactor(game, action) {
  let skillFactor = 1;
  for (const [skill, factor] of Object.entries(action.skills)) {
    const skill_level = game.skills[skill].level;
    skillFactor += skill_level * factor * 0.01;
  }

  return skillFactor;
}

export function calculateActionSkillFactors(game) {
    for (const action in ACTIONS) {
        game.actionSkillFactors[action] = calculateActionSkillFactor(game, ACTIONS[action]);
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
}