// TODO add 
// resourceGreaterThan
// (not) hasCondition

import { LOCATIONS } from "../data/locationsData.js"

function meetsRequirement(game, requirement) {
  switch (requirement.type) {
    case "item":
      return (game.inventory[requirement.item] || 0) > 0;
    case "locationHasTag":
      return (requirement.tag in LOCATIONS[game.location].tags);
    case "stat":
      return (game.attributes[requirement.stat]?.value || 0) >= requirement.value;
    case "resourceLessThan":
      const resourceVal = game.resources[requirement.resource].current;
      const resourceMax = game.resources[requirement.resource].max;
      // If value positive 
      if (requirement.value >= 0) return resourceVal < requirement.value;
      else return resourceVal < resourceMax - (requirement.value + 1);
    default:
      return false;
  }
}

function meetsRequirementsGroup(game, requirements) {
  return requirements.some((requirement) => meetsRequirement(game, requirement));
}

export function meetsRequirements(game, action) {
  if (!action.requirements || action.requirements.length === 0) return true;

  if (Array.isArray(action.requirements[0])) {
    return action.requirements.every((group) =>
      Array.isArray(group) && meetsRequirementsGroup(game, group)
    );
  }

  return action.requirements.every((requirement) => meetsRequirement(game, requirement));
}