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


  activeConditions: {
    wet: {
      duration: 60,
      strength: 1,
    },

  },

  inventory: {
    sword: 1,
  },

  quests: {},

  location: "village_1",

  activeAction: "jogging",

  actions: {
    jogging: {
      progress: 0,
      completions: 0,
      competency: 1,
    }
  },
  
  eventStack: [],

};