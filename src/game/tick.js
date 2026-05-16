import { ACTIONS } from "../data/actions.js";
import { applyResult } from "./results.js";
import { grantSkillXp } from "./skills.js";
import { game } from "./state.js";

const TICK_RATE = 1000 / 20;

export function startTicking(render) {
  setInterval(() => {
    tick();
    render();
  }, TICK_RATE);
}

function tick() {
  game.tick++;
  if (game.activeAction) {
    processAction();
  }
}

let action_progresses = {};

function processAction() {
  const current_id = game.activeAction;
  const action = ACTIONS[current_id];

  // How much the player's skills affect the current action.
  // Decreases time taken, increases skill gain
  let skillFactor = calculateActionSkillFactor(game, action);
  let duration = action.duration / skillFactor;


  for (const cost of action.tick) {
    applyResult(game, cost);
  } 

  for (const [skill, factor] of Object.entries(action.skills)) {
    grantSkillXp(game, skill, factor * skillFactor);
  }

  action_progresses[current_id] ??= 0;
  action_progresses[current_id] += 1;


  if (action_progresses[current_id] >= duration) {
    for (const result of action.result) {
      applyResult(game, result);
    }

    action_progresses[current_id] = 0;
  }
}

function calculateActionSkillFactor(game, action) {
  let skillFactor = 1;

  for (const [skill, factor] of Object.entries(action.skills)) {
    const skill_level = game.skills[skill].level;
    skillFactor += skill_level * factor * 0.01;
  }

  return skillFactor;
}