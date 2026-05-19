import { SKILLS } from "../data/skills.js";
import { ACTIONS } from "../data/actions.js";
import { TRAITS } from "../data/traits.js";

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

export function calculateSkillMultipliers(game) {

    for (const skill in SKILLS) {
        let multiplier = 1;

        // TODO remove nested loop
        for (const trait of game.traits) {
            const traitDef = TRAITS[trait];
            if (!traitDef || !traitDef.effects) continue;

            for (const [effect, number] in Object.entries(traitDef.effects)) {
                if (effect == skill) {
                    multiplier *= number;
                }
            }
        } 
        
        game.skills[skill] = game.skills[skill] || { multiplier: 1 };
        game.skills[skill].multiplier = multiplier;
    }
}