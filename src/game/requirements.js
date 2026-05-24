export const req = {
  item: (item) => ({
    type: "item",
    item,
  }),

  location: (location) => ({
    type: "location",
    location,
  }),

  stat: (stat, value) => ({
    type: "stat",
    stat,
    value,
  }),

  // If value is negative, it's treated as `resource.max - value`
  resourceLessThan: (resource, value) => ({
    type: "resourceLessThan",
    resource,
    value,
  }),
};

// TODO add 
// resourceGreaterThan
// (not) hasCondition

// TODO
// Should this be 
// [x AND y] OR [z AND w]
// [x OR y] AND [z OR w]
// first would be more intuitive
// second would allow things like [some matching location] AND [some way to gather]


function meetsRequirement(game, requirement) {
  switch (requirement.type) {
    case "item":
      return (game.inventory[requirement.item] || 0) > 0;
    case "location":
      return game.location === requirement.location;
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
  return requirements.every((requirement) => meetsRequirement(game, requirement));
}

export function meetsRequirements(game, action) {
  if (!action.requirements || action.requirements.length === 0) return true;

  if (Array.isArray(action.requirements[0])) {
    return action.requirements.some((group) =>
      Array.isArray(group) && meetsRequirementsGroup(game, group)
    );
  }

  return meetsRequirementsGroup(game, action.requirements);
}