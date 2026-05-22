import { eff } from "../game/effects.js"

export const CONDITIONS = {

    wet: {
        name:"Wet",
        description:"You're soaked. Lowers cold resistance, increases fire resistance",
        effects: [],
        duration: 60,
    },

    chilly: {
        name:"Chilly",
        description:"You feel chilly. You move and regenerate stamina slightly slower",
        effects: [eff.changeAttribute("agility", 0, -0.1), eff.conditionStrength("stamina_regen", 0.9)],
        duration: 60,
    },

    cold: {
        name:"Cold",
        description:"You feel cold. You move and regenerate stamina slower. You have a slight mental drain.",
        effects: [eff.changeAttribute("agility", 0, -0.2)],
        duration: 60,
    },


    combat_fatigue: {
        name:"Combat Fatigue",
        description:"The chaos of battle is getting to you. You're getting stressed and fatigued",
        effects: [eff.addEventEffect("tick", eff.changeResource("stamina", -1)), eff.addEventEffect("tick", eff.changeResource("mental", -1))],
        duration: -1,
    },
}