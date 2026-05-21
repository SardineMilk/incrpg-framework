import { ACTIONS } from "../data/actionsData.js";
import { applyEffect } from "./effects.js";
import { grantSkillXp } from "./skills.js";
import { game } from "./state.js";
import { initialiseState, calculateActionSkillFactors} from "../utils/state_creator.js";
import { applyConditionEffects } from "./conditions.js";

const TICK_RATE = 1000 / 20;

export function startTicking(render) {
  initialiseState(game);
  calculateActionSkillFactors(game);

  for (const condition in game.activeConditions) {
    applyConditionEffects(game, condition);
  }

  setInterval(() => {
    tick();
    render();
  }, TICK_RATE);
}

function tick() {
  game.tick++;

  const tickEffects = game.eventEffects["tick"];
  for (const effect of tickEffects) {
    applyEffect(game, effect);
  }

  if (game.activeAction) {
    processAction();
  }
}


function processAction() {
  const current_id = game.activeAction;
  const action = ACTIONS[current_id];

  // How much the player's skills affect the current action.
  // Decreases time taken, increases skill gain
  let skillFactor = game.actionSkillFactors[current_id];
  let duration = action.duration / skillFactor;

  for (const effect of action.tick) {
    applyEffect(game, effect);
  } 

  for (const [skill, factor] of Object.entries(action.skills)) {
    grantSkillXp(game, skill, factor * skillFactor);
  }

  game.actionProgresses[current_id] ??= 0;
  game.actionProgresses[current_id] += 1;


  if (game.actionProgresses[current_id] >= duration) {
    for (const effect of action.result) {
      applyEffect(game, effect);
    }
    game.actionCompletions[current_id]++;
    game.actionProgresses[current_id] = 0;
  }
}
