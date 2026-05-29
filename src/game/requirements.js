// TODO add 
// resourceGreaterThan
// (not) hasCondition

import { LOCATIONS } from "../data/locationsData.js"

function meetsRequirement(game, requirement) {
  switch (requirement.type) {
    case "item":
      return (game.inventory[requirement.item] || 0) > 0;

    case "locationHasTag":
      return LOCATIONS[game.location].tags.includes(requirement.tag);

    case "skillMoreThan":
      return game.skills[requirement.skill].level >= requirement.level;

    case "skillBaseMoreThan":
      return game.skills[requirement.skill].base >= requirement.level;

      case "resourceLessThan":
      const resourceVal = game.resources[requirement.resource].current;
      const resourceMax = game.resources[requirement.resource].max;
      if (requirement.value >= 0) return resourceVal < requirement.value;
      else return resourceVal < resourceMax - (requirement.value + 1);

    case "hasCondition":
      if (!(requirement.condition in game.activeConditions)) return false;
      if (requirement.min_duration == null) return true;
      if (requirement.min_duration <= game.activeConditions[requirement.condition].duration) return true;
      return false;

    case "hasNotCondition":
      return (!(requirement.condition in game.activeConditions));

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