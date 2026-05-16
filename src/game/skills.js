import { SKILLS } from "../data/skills.js";
import { EFFECTS } from "../data/effects.js";
import { TRAITS } from "../data/traits.js";

export function xpToNext(level) {
  // xpToNext = Math.floor(scalingFactor * Math.pow(2, level/5));
  // Math.floor(100 * Math.pow(level, scalingFactor))
  const scalingFactor = 100;
  return Math.floor(scalingFactor * Math.pow(2, level/5));
}

export function grantSkillXp(game, skillId, amount) {
  const skill = game.skills[skillId];

  const xpForSkill = applySkillXpModifiers(game, skillId, amount);
  skill.xp += xpForSkill;  // TODO add modifiers
  while (skill.xp >= xpToNext(skill.level)) {

    skill.xp -= xpToNext(skill.level);
    skill.level++;

    console.log(`${skillId} leveled to ${skill.level}. XP to next: ${xpToNext(skill.level)}`);
  }

  propagateParentXp(game, skillId, amount);
}

function propagateParentXp(game, skillId, amount) {

  const parent = SKILLS[skillId].parent;

  if (!parent) return;

  const parentFactor = 0.5
  grantSkillXp(game, parent, amount * parentFactor);
}

function applySkillXpModifiers(state, skillId, baseXp) {
  const modifier = getSkillXpModifier(state, skillId);
  const xp = baseXp * modifier;
  return xp;
}

function getSkillXpModifier(state, skillId) {
  const heroTraits = state.traits;
  const activeEffects = state.effects;

  return 1;
}