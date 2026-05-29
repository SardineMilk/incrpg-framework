import { SKILLS } from "../data/skillsData.js";
import { LogType } from "./log.js";
import { applyEffect } from "./effects.js";
import { eff } from "../data/structure.js";

export function xpToNext(level) {
  // xpToNext = Math.floor(scalingFactor * Math.pow(2, level/5));
  // Math.floor(100 * Math.pow(level, scalingFactor))
  const scalingFactor = 100;
  return Math.floor(scalingFactor * Math.pow(2, level/5));
}

export function grantSkillXp(game, skillId, amount) {
  game.skills = game.skills || {};
  game.skills[skillId] = game.skills[skillId] || {xp:0, level:0, multiplier:1}; 
  const skill = game.skills[skillId];

  const xpForSkill = amount * game.skills[skillId].multiplier;
  if (skillId == "combat") console.log(skillId, amount, xpForSkill);
  skill.xp += xpForSkill;  // TODO add modifiers
  while (skill.xp >= xpToNext(skill.level)) {

    skill.xp -= xpToNext(skill.level);
    skill.level++;

    const skillMessage = `${SKILLS[skillId].name} leveled to ${skill.level}`
    game.log.append(LogType.SKILL, skillMessage);
  }

  // Should this be `amount` or `xpForSkill`?
  propagateParentXp(game, skillId, xpForSkill);
}

function propagateParentXp(game, skillId, amount) {

  const parent = SKILLS[skillId].parent;

  if (!parent) return;

  const parentFactor = 0.5
  grantSkillXp(game, parent, amount * parentFactor);
}


export function applySkillEffects(game) {
  for (const skillId in game.skills) {
      const skill = game.skills[skillId];
      const skillLevel = (skill.level + skill.boostFlat) * skill.boostMultiplier;
  
      for (const milestoneLevel in skill.milestones) {
        if (milestoneLevel > skillLevel) break;
        for (const effect of (skill.level||[])) applyEffect(effect);
        for (const effect of skill.milestones[milestoneLevel]) applyEffect(effect);
      }
  }
}