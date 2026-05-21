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
};


function meets(requirement) {
  return action.requirements.every(r => {
    switch (r.type) {
      case "item":
        return game.inventory[r.item] > 0;
      case "location":
        // TODO allow location tags. e.g. aquatic, settlement, indoors
        return game.location === r.location;
      case "stat":
        return game.stats[r.stat] >= r.value;
      default:
        return false;
    }
  });
}

export function meetsRequirements(game, action) {
  // Actions can have multiple viable requirements
  // Top level OR, inside requirement AND
  for (const requirement in action.requirements) {
    if (meets(requirement)) return true;
  }
  return false;
}