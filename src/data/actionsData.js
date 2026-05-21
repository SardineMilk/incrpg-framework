import { req } from "../game/requirements.js";
import { eff } from "../game/effects.js";

export const ACTIONS = {

  jogging: {
    name: "Jogging",
    duration: 20,
    requirements: [
      req.location("village"),
    ],

    attributes: {
      strength: 0.2,
      constitution: 0.5,
      agility: 1,
      dexterity: 0.2,
      intelligence: 0,
      willpower: 0.2,
      wit: 0,
      perception: 0.2,
    },

    skills: {
      running:1,
      exercise:0.5,
    },

    tick: [
      eff.changeResource("stamina", -1),
    ],

    result: [
      eff.sendMessage("Result", "You went for a short run"),
      eff.changeResource("health", -1),
    ]

  },

  trainSword: {
    name: "Train Sword",

    duration: 30,

    requirements: [
      [req.item("sword"), req.location("village"),]
    ],


    skills: {
      sword: 1,
      training: 0.5,
    },

    result: [
      eff.changeResource("stamina", -5),
      eff.grantSkillXp("sword", 25),
    ],
  },

  meditate: {
    name: "Meditate",

    duration: 50,

    skills: {
      meditation: 1,
      breathing: 0.5,
    },

    result: [
      eff.changeResource("mental", 10),
      eff.grantSkillXp("meditation", 20),
    ],
  },
};