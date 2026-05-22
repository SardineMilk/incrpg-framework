import { ACTIONS } from "../data/actionsData.js";
import { applyEffect } from "./effects.js";
import { grantSkillXp } from "./skills.js";
import { game } from "./state.js";
import { initialiseState, calculateActionsCompetency} from "../utils/state_creator.js";
import { applyConditionEffects } from "./conditions.js";
import { LogType, EventLog } from "./log.js";


const TICK_RATE = 1000 / 20;

export function startTicking(render) {
  initialiseState(game);

  game.log = new EventLog({container: document.getElementById("log-box")})
  game.log.container.scrollTop = game.log.container.scrollHeight;
  game.log.followTail = true;
  setInterval(() => {
    tick();
    render();
  }, TICK_RATE);
}

function tick() {
  game.tick++;

  for (const effect of game.eventEffects["tick"]) {
    applyEffect(game, effect);
  }

  for (const condition in game.activeConditions) {
    applyConditionEffects(game, condition);
  }

  calculateAttributes(game);

  calculateActionsCompetency(game);

  if (game.activeAction) {
    processAction();
  }
}


function processAction() {
  const current_id = game.activeAction;
  const action = ACTIONS[current_id];

  let duration = action.duration / game.actions[current_id].competency;

  for (const effect of action.tick) {
    applyEffect(game, effect);
  } 

  game.actions[current_id].progress += 1;
  if (game.actions[current_id].progress >= duration) {
    for (const effect of action.result) {
      applyEffect(game, effect);
    }
    game.actions[current_id].completions += 1;
    game.actions[current_id].progress = 0;

  }
}


function calculateAttributes(game) {
  for (const name in game.attributes) {
    const attribute = game.attributes[name];
    attribute.value = attribute.flat * attribute.multiplier;
  }
}