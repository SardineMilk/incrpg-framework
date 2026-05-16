import { req } from "../game/requirements.js";
import { res } from "../game/results.js";

export const ACTIONS = {

  jogging: {
    name: "Jogging",
    duration: 1,
    requirements: [

    ],

    tick: [
      // Replace stamina drain here
    ],

    result: [
      res.resource("stamina", -5),
      res.skillXp("exercise", 10),
      res.skillXp("running", 10),
    ]

  },

  trainSword: {
    name: "Train Sword",

    duration: 30,

    requirements: [
      req.item("sword"),
      req.location("village"),
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