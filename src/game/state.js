// This should be constructed from save data
export const game = {

  tick: 0,

  resources: {
    health: {
      current: 100,
      valueMax: 100,
      multiplier: 1,
    },

    stamina: {
      current: 100,
      valueMax: 100,
      multiplier: 1,
    },

    mental: {
      current: 100,
      valueMax: 100,
      multiplier: 1,
    },
  },

  // Do we need value?
  attributes: {
    strength: {
      value:0,
      flat:10,
      multiplier:1,
    },
    constitution: {
      value:0,
      flat:10,
      multiplier:1,
    },
    agility: {
      value:0,
      flat:10,
      multiplier:1,
    },
    dexterity: {
      value:0,
      flat:10,
      multiplier:1,
    },
    intelligence: {
      value:0,
      flat:10,
      multiplier:1,
    },
    willpower: {
      value:0,
      flat:10,
      multiplier:1,
    },
    wit: {
      value:0,
      flat:10,
      multiplier:1,
    },
    perception: {
      value:0,
      flat:10,
      multiplier:1,
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

  actions: {
    jogging: {
      progress: 0,
      completions: 0,
      competency: 1,
    }
  },
  
  conditionStrengths: {},

  eventEffects: {
    tick: [],
  },
};