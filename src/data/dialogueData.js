export const DIALOGUES = {

// Swap action for result?
// More boilerplate but more flexibility
// Have action as special case?

albie_talk: {
    name: "Talk to Elder Albie",
    duration: 1,
    result: [ 
        eff.npcSay("elder_albie", "How can I help you?"), 
        eff.presentChoice([
            { text: "Just passing through.", action: "albie_farewell" },
            { text: "Hello!", action: "albie_greet", requirements: [req.hasNotCondition("met_albie")] },
            { text: "Can you tell me more about the village?", action: "albie_lore_1", requirements: [req.hasCondition("met_albie")] },
        ]),
    ],
},

albie_greet: {
    name: "",
    duration: 1,
    result: [ 
        eff.npcSay("elder_albie", "Hello there! I'm Albie."), 
        eff.applyCondition("met_albie"),
        eff.presentChoice([
            { text: "It's nice to meet you.", result: [eff.setActiveAction("albie_farewell")] },
        ]),
    ],
},

albie_lore_1: {
    name: "",
    duration: 1,
    result: [ 
        eff.npcSay("elder_albie", "This village was founded"), 
        eff.presentChoice([
            { text: "Thanks, very informative.", action: "albie_farewell" },
        ]),
    ],
},

albie_farewell: {
  duration: 1,
  result: [
    eff.npcSay("elder_albie", "Safe travels."),
    eff.setActiveAction(null),
  ],
},

}