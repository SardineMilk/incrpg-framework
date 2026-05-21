import { eff } from "../game/effects.js"

export const TRAITS = {
    /* Combat */
    combat_1: {
        name: "Battle Hardened 1", 
        description: "You've had a small taste of combat. You're no longer completely lost when fighting. Lowers passive mental and stamina drain of combat.",
        effects:[eff.conditionStrength("combat_fatigue", 0.5), eff.skillXpMultiplier("exercise", 10)], 
    },
    combat_2: {
        name: "Battle Hardened 2", 
        description: "Lorem ipsum dolor sit amet.",
        effects:[], 
    },
    combat_3: {
        name: "Battle Hardened 3", 
        description: "Lorem ipsum dolor sit amet.",
        effects:[], 
    },
    combat_4: {
        name: "Battle Hardened 4", 
        description: "Lorem ipsum dolor sit amet.",
        effects:[], 
    },
    combat_5: {
        name: "Battle Hardened 5",
        description: "Lorem ipsum dolor sit amet.",
        effects:[], 
    },

    /* Unarmed */
    Unarmed_1: {
        name: "Pugilist 1",
        description: "Many would say its foolish to fight without a weapon.",
        effects:[],
    },
    Unarmed_2: {
        name: "Pugilist 2",
        description: "You do it anyway.",
        effects:[],
    },
    Unarmed_3: {
        name: "Pugilist 3",
        description: "Your hands are as deadly as any common weapon.",
        effects:[],
    },
    Unarmed_4: {
        name: "Pugilist 4",
        description: "Your hands are more deadly than most uncommon weapons too.",
        effects:[],
    },
    Unarmed_5: {
        name: "Pugilist 5",
        description: "A weapon would only hold you back. Your blows shatter mountains and alter the weather.",
        effects:[],
    },

    /* Unarmed + Unarmored */
    brawler: {
        name: "Brawler",
        description: "Fight without armor or a weapon. Float like a leaf, hit like a boulder.",
        effects:[],
    },
}