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
    },

    combat: {
      xp: 0,
      level: 0,
    },

    meditation: {
      xp: 0,
      level: 0,
    },

    regeneration: {
      xp: 0,
      level: 0,
    },

    training: {
      xp: 0,
      level: 0,
    },

    exercise: {
      xp: 0,
      level: 0,
    },

    running: {
      xp: 0,
      level: 0,
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