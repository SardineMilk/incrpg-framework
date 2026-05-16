export const game = {

  tick: 0,

  resources: {
    health: 100,
    maxHealth: 100,

    stamina: 100,
    maxStamina: 100,

    mental: 100,
    maxMental: 100,

    gold: 0,
  },

  attributes: {
    strength: 10,
    constitution: 10,
    agility: 10,
    dexterity: 10,
    intelligence: 10,
    willpower: 10,
    wit: 10,
    perception: 10,
  },

  skills: {
    sword: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    combat: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    meditation: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    regeneration: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    training: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    exercise: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    running: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

  },

  traits: [
    "combat_training_1",
  ],

  effects: {
    wet: 60,
  },

  inventory: {
    sword: 1,
  },

  quests: {},

  location: "village",

  activeAction: "jogging",
};