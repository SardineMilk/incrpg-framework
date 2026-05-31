// TODO add 
// resourceGreaterThan
// (not) hasCondition

import { LOCATIONS } from "../data/locationsData.js"
import { req } from "../data/structure.js";

function resolve(game, value) {
    return typeof value === 'function' ? value(game) : value;
}

function meetsRequirement(game, requirement) {
    switch (requirement.type) {
        case "item":
            return (game.inventory[requirement.item] || 0) > 0;

        case "locationHasTag":
            return LOCATIONS[game.location].tags.includes(requirement.tag);

        case "skillMoreThan":
            return game.skills[requirement.skill].level >= resolve(game, requirement.level);

        case "skillBaseMoreThan":
            return game.skills[requirement.skill].base >= resolve(game, requirement.level);

        case "resourceUnderMaxBy":
            return game.resources[requirement.resource].current < 
                (game.resources[requirement.resource].max - resolve(game, requirement.value));

        case "resourceLessThan":
            return game.resources[requirement.resource].current < resolve(game, requirement.value);

        case "hasCondition":
            if (!(requirement.condition in game.activeConditions)) return false;
            if (requirement.min_duration == null) return true;
            return resolve(game, requirement.min_duration) <= game.activeConditions[requirement.condition].duration;

        case "hasNotCondition":
            return !(requirement.condition in game.activeConditions);

        case "flagSet":
            return game[resolve(game, requirement.flag)] != false;

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