import { req } from "../game/requirements.js";
import { res } from "../game/results.js";

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
      res.resource("stamina", -1),
    ],

    result: [
      res.log("Result", "You went for a short run"),
    ]

  },

  trainSword: {
    name: "Train Sword",

    duration: 30,

    requirements: [
      [req.item("sword"), req.location("village"),]
    ],

    result: [
      res.resource("stamina", -5),
      res.skillXp("sword", 25),
    ],
  },

  meditate: {
    name: "Meditate",

    duration: 50,

    result: [
      res.resource("mp", 10),
      res.skillXp("meditation", 20),
    ],
  },
};