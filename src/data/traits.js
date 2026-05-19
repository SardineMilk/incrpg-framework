import { eff } from "../game/effects.js"

export const TRAITS = {
    /* Combat */
    combat_1: {
        name: "Battle Hardened 1", 
        effects:[eff.conditionStrength("combat_fatigue", 0.5), eff.skillMultiplier("exercise", 10)], 
        description: "You've had a small taste of combat. You're no longer completely lost when fighting. Lowers passive mental and stamina drain of combat."
    },
    combat_2: {
        name: "Battle Hardened 2", 
        effects:[], 
        description: "Lorem ipsum dolor sit amet.",
    },
    combat_3: {
        name: "Battle Hardened 3", 
        effects:[], 
        description: "Lorem ipsum dolor sit amet.",
    },
    combat_4: {
        name: "Battle Hardened 4", 
        effects:[], 
        description: "Lorem ipsum dolor sit amet.",
    },
    combat_5: {
        name: "Battle Hardened 5",
        effects:[], 
        description: "Lorem ipsum dolor sit amet.",
    },

    /* Unarmed */
    Unarmed_1: {
        name: "Pugilist 1",
        effects:[],
        description: "Many would say its foolish to fight without a weapon."
    },
    Unarmed_2: {
        name: "Pugilist 2",
        effects:[],
        description: "You do it anyway."
    },
    Unarmed_3: {
        name: "Pugilist 3",
        effects:[],
        description: "Your hands are as deadly as any common weapon."
    },
    Unarmed_4: {
        name: "Pugilist 4",
        effects:[],
        description: "Your hands are more deadly than most uncommon weapons too."
    },
    Unarmed_5: {
        name: "Pugilist 5",
        effects:[],
        description: "A weapon would only hold you back. Your blows shatter mountains and alter the weather."
    },

    /* Unarmed + Unarmored */
    brawler: {
        name: "Brawler",
        effects:[],
        description: "Fight without armor or a weapon. Float like a leaf, hit like a boulder."
    },
}