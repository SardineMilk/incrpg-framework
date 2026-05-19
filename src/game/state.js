// This should be constructed from save data
export const game = {

  tick: 0,

  resources: {
    health: {
      current: 100,
      baseMax: 100,
      multiplier: 1,
    },

    stamina: {
      current: 100,
      baseMax: 100,
      multiplier: 1,
    },

    mental: {
      current: 100,
      baseMax: 100,
      multiplier: 1,
    },
  },

  attributes: {
    strength: {
      base:10,
      multiplier:1,
    },
    constitution: {
      base:10,
      multiplier:1,
    },
    agility: {
      base:10,
      multiplier:1,
    },
    dexterity: {
      base:10,
      multiplier:1,
    },
    intelligence: {
      base:10,
      multiplier:1,
    },
    willpower: {
      base:10,
      multiplier:1,
    },
    wit: {
      base:10,
      multiplier:1,
    },
    perception: {
      base:10,
      multiplier:1,
    },
  },

  skills: {
    combat: {
      xp: 0,
      level: 0,
      multiplier: 1,
    },

    sword: {
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

    breathing: {
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
    "combat_1",
  ],

  activeConditions: {
    wet: 60,
  },

  inventory: {
    sword: 1,
  },

  quests: {},

  location: "village",

  activeAction: "jogging",

  
  actionCompletions: {},
  actionProgresses: {},

  actionSkillFactors: {},
  effectStrengths: {},
  statMultipliers: {},

};