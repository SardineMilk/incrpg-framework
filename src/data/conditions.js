export const CONDITIONS = {

    wet: {
        name:"Wet",
        description:"You're soaked. Lowers cold resistance, increases fire resistance",
        effects: {cold_resistance:{multiplier:0.75}, fire_resistance:{multiplier:1.25}},
        duration: 60,
    },

    chilly: {
        name:"Chilly",
        description:"You feel chilly. You move and regenerate stamina slightly slower",
        effects: {agility:{multiplier:0.9}, stamina_regen:{multiplier:0.9}},
        duration: 60,
    },

    cold: {
        name:"Cold",
        description:"You feel cold. You move and regenerate stamina slower. You have a slight mental drain.",
        effects: {agility:{multiplier:0.8}, stamina_regen:{multiplier:0.8}, mental_regen:{flat:-0.5}},
        duration: 60,
    },


    combat_fatigue: {
        name:"Combat Fatigue",
        description:"The chaos of battle is getting to you. You're getting stressed and fatigued",
        effects: {stamina_regen:{flat:-1}, mental_regen:{flat:-1}},
        duration: -1,
    },
}