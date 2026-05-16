import { ACTIONS } from "../data/actions.js";
import { applyResult } from "./results.js";
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
  } else {
    processResting();
  }
}

let action_progresses = {};

function processAction() {
  const current_id = game.activeAction;
  const action = ACTIONS[current_id];
  //console.log(game.skills["running"]);
  action_progresses[current_id] ??= 0;
  action_progresses[current_id] += 1;
  //current.progress++; // TODO make this better

  if (action_progresses[current_id] >= action.duration) {
    for (const result of action.result) {
      applyResult(game, result);
    }

    action_progresses[current_id] = 0;
  }
}

function processResting() {

  restore("hp", 0.1);
  restore("sp", 0.2);
  restore("mp", 0.15);
}

function restore(resource, amount) {

  const maxKey =
    "max" +
    resource.charAt(0).toUpperCase() +
    resource.slice(1);

  game.resources[resource] = Math.min(
    game.resources[resource] + amount,
    game.resources[maxKey]
  );
}