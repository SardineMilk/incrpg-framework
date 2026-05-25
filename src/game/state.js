// This should be constructed from save data
export const game = {

  tick: 0,

  resources: {
    health: {
      current: 100,
      max: 100,
      multiplier: 1,
    },

    stamina: {
      current: 100,
      max: 100,
      multiplier: 1,
    },

    mental: {
      current: 100,
      max: 100,
      multiplier: 1,
    },
  },

  attributes: {
    strength: {
      value:0,
      flat:0,
      multiplier:1,
    },
    constitution: {
      value:0,
      flat:0,
      multiplier:1,
    },
    agility: {
      value:0,
      flat:0,
      multiplier:1,
    },
    dexterity: {
      value:0,
      flat:0,
      multiplier:1,
    },
    intelligence: {
      value:0,
      flat:0,
      multiplier:1,
    },
    willpower: {
      value:0,
      flat:0,
      multiplier:1,
    },
    wit: {
      value:0,
      flat:0,
      multiplier:1,
    },
    perception: {
      value:0,
      flat:0,
      multiplier:1,
    },
  },


  activeConditions: {
    combat_1: {
      strength: 1,
    },
    wet: {
      duration: 60,
      strength: 1,
    },

  },

  inventory: {
    sword: 1,
  },

  quests: {},

  location: "village",

  activeAction: "jogging",

  actions: {
    jogging: {
      progress: 0,
      completions: 0,
      competency: 1,
    }
  },
  

  eventEffects: {
    tick: [],
  },
};