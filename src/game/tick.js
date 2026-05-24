import { ACTIONS } from "../data/actionsData.js";
import { EVENT_EFFECTS } from "../data/eventData.js";
import { applyEffect } from "./effects.js";
import { grantSkillXp } from "./skills.js";
import { game } from "./state.js";
import { initialiseState} from "../utils/state_creator.js";
import { calculateActionsCompetency } from "./actions.js";
import { applyConditionEffects } from "./conditions.js";
import { LogType, EventLog } from "./log.js";
import { setIntervalFix, clearIntervalFix } from "../utils/throttleFix.js";
import { processEventQueue} from "./events.js"

const TICK_RATE = 1000 / 20;

let intervalId = null;
export function startTicking(render) {
  initialiseState(game);

  // TODO factor this out
  game.log = new EventLog({container: document.getElementById("log-box")})
  game.log.container.scrollTop = game.log.container.scrollHeight;
  game.log.followTail = true;

  // TODO factor this out
  game.eventEffects = EVENT_EFFECTS;


  if (intervalId !== null) {
    setIntervalFix(intervalId);
  }

  intervalId = setIntervalFix(() => {
    tick();
    render(game);
  }, TICK_RATE);

  return () => {
    if (intervalId !== null) {
      clearIntervalFix(intervalId);
      intervalId = null;
    }
  };
}

function tick() {
  const previousState = JSON.parse(JSON.stringify(game));

  game.tick++;

  for (const condition in game.activeConditions) {
    applyConditionEffects(game, condition);
  }

  // TODO apply skill milestones

  calculateAttributes(game);

  calculateActionsCompetency(game);

  if (game.activeAction) {
    processAction();
  }

  processEventQueue(game, previousState);
}


function processAction() {
  const current_id = game.activeAction;
  const action = ACTIONS[current_id];

  let duration = Math.ceil(action.duration / game.actions[current_id].competency);

  if (action.attributes) {
    for (const attribute in action.attributes) {
      grantSkillXp(game, attribute, action.attributes[attribute]);
    }
  }
  if (action.tick) {
    for (const effect of action.tick) {
      applyEffect(game, effect);
    } 
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
    const base = attribute.flat + game.skills[name].level;
    attribute.value = base * attribute.multiplier;
  }
}