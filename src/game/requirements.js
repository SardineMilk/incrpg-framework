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

export function meetsRequirements(game, action) {

  return action.requirements.every(r => {

    switch (r.type) {

      case "item":
        return game.inventory[r.item] > 0;

      case "location":
        return game.location === r.location;

      case "stat":
        return game.stats[r.stat] >= r.value;

      default:
        return false;
    }
  });
}