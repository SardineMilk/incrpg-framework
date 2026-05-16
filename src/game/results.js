import { grantSkillXp } from "./skills.js";

export const res = {

  resource: (resource, amount) => ({
    type: "resource",
    resource,
    amount,
  }),

  skillXp: (skill, amount) => ({
    type: "skillXp",
    skill,
    amount,
  }),

  move: (location) => ({
    type: "move",
    location,
  }),

  log: (category, message) => ({
    type: "log",
    category, 
    message,
  }),
};

export function applyResult(game, result) {
  switch (result.type) {
    case "resource":
      game.resources[result.resource] += result.amount;
      break;
    case "skillXp":
      grantSkillXp(game, result.skill, result.amount);
      break;
    case "move":
      game.location = result.location;
      break;
    case "log":
      console.log(`${result.category}: ${result.message}`);
      break;
  }
}