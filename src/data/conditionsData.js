import { eff } from "./structure.js"

export const CONDITIONS = {
    sleeping: {
        name: "Sleeping",
        description: "You are asleep, greatly boosting your natural recovery",
        effects: [     
            eff.changeConditionStrength("health_regen", 10),
            eff.changeConditionStrength("stamina_regen", 10),
            eff.changeConditionStrength("mental_regen", 10),
        ],
    },

    wet: {
        name:"Wet",
        description:"You're soaked. Lowers cold resistance, increases fire resistance",
        effects: [],
    },

    chilly: {
        name:"Chilly",
        description:"You feel chilly. You move and regenerate stamina slightly slower",
        effects: [eff.changeAttribute("agility", 0, -0.1), eff.changeConditionStrength("stamina_regen", -0.1)],
    },

    cold: {
        name:"Cold",
        description:"You feel cold. You move and regenerate stamina slower. You have a slight mental drain.",
        effects: [eff.changeAttribute("agility", 0, -0.2)],
    },


    combat_fatigue: {
        name:"Combat Fatigue",
        description:"The chaos of battle is getting to you. You're getting stressed and fatigued",
        effects: [eff.addEventEffect("tick", eff.changeResource("stamina", -1)), eff.addEventEffect("tick", eff.changeResource("mental", -1))],
    },
}