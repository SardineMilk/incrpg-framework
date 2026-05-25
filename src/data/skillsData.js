import { eff } from "./structure.js";
export const SKILLS = {
  // Attribute skills to allow them to level up.
  // Don't add milestones
  strength:     {name:"Strength", level:[eff.changeAttribute("strength", 1, 0)]},
  constitution: {name:"Constitution"},
  agility:      {name:"Agility"},
  dexterity:    {name:"Dexterity"},
  intelligence: {name:"Intelligence"},
  willpower:    {name:"Willpower"},
  wit:          {name:"Wit"},
  perception:   {name:"Perception"},


 
  combat: {
    name: "Combat",
    description: "Pit your mind and body against another in battle.",
    parent:null,
    milestones: {5:"combat_1",10:"combat_2",20:"combat_3",40:"combat_4",80:"combat_5"}
  },

  weapon_proficiency: {
    name: "Weapon Proficiency",
    description: "Mastery of melee weapons. Wield them as an extension of your body.",
    parent: "combat",
    milestones: {5:"weapon_proficiency_1",10:"weapon_proficiency_2",20:"weapon_proficiency_3",40:"weapon_proficiency_4",80:"weapon_proficiency_5"}
  },

  club: {
    name: "Club Fighting",
    description: "A stick. A hammer. The closest rock. The first weapon ever used, and it holds up today.",
    parent: "weapon_proficiency",
    milestones: {5:"club_1",10:"club_2",20:"club_3",40:"club_4",80:"club_5"}
  },
  sword: {
    name: "Sword Fighting",
    description: "A tool of war.",
    parent: "weapon_proficiency",
    milestones: {5:"sword_1",10:"sword_2",20:"sword_3",40:"sword_4",80:"sword_5"}
  },
  dagger: {
    name: "Dagger Fighting",
    description: "Small, pointy object. Learn how and where to poke things.",
    parent: "weapon_proficiency",
    milestones: {5:"dagger_1",10:"dagger_2",20:"dagger_3",40:"dagger_4",80:"dagger_5"}
  },
  axe: {
    name: "Axe Fighting",
    description: "Splitting limbs is easier than logs.",
    parent: "weapon_proficiency",
    milestones: {5:"axe_1",10:"axe_2",20:"axe_3",40:"axe_4",80:"axe_5"}
  },
  spear: {
    name: "Spear Fighting",
    description: "A versatile and effective weapon. Keep your distance and poke.",
    parent: "weapon_proficiency",
    milestones: {5:"spear_1",10:"spear_2",20:"spear_3",40:"spear_4",80:"spear_5"}
  },

  ranged: {
    name: "Ranged",
    description: "The art of accelerating objects towards a target.",
    parent: "combat",
    milestones: {5:"ranged_1",10:"ranged_2",20:"ranged_3",40:"ranged_4",80:"ranged_5"}
  },

  archery: {
    name: "Archery",
    description: "Use a bow to shoot an arrow. Surprisingly tricky, but effective. If you have arrows.",
    parent: "ranged",
    milestones: {5:"archery_1",10:"archery_2",20:"archery_3",40:"archery_4",80:"archery_5"}
  },
  throwing: {
    name: "Throwing",
    description: "Humanoid creatures are uniquely suited to throwing stuff. Exploit this advantage.",
    parent: "ranged",
    milestones: {5:"throwing_1",10:"throwing_2",20:"throwing_3",40:"throwing_4",80:"throwing_5"}
  },

  unarmed: {
    name: "Unarmed",
    description: "Fight without using a weapon. You're not a cheater.",
    parent: "combat",
    milestones: {5:"unarmed_1",10:"unarmed_2",20:"unarmed_3",40:"unarmed_4",80:"unarmed_5"}
  },

  recovery: {
    name:"Recovery",
    description:"Restore yourself to peak condition. Should you be proud of this skill?",
    parent:null,
    milestones: {5:"recovery_1",10:"recovery_2",20:"recovery_3",40:"recovery_4",80:"recovery_5"}
  },
  regeneration: {
    name: "Regeneration",
    description: "If you keep getting hurt, your body learns to heal faster. Thats how it works.",
    parent: "recovery",
    milestones: {5:"regeneration_1",10:"regeneration_2",20:"regeneration_3",40:"regeneration_4",80:"regeneration_5"}
  },  
  breathing: {
    name: "Breathing",
    description: "You're breathing wrong. In through the nose. Bring air down to the belly. Out through the mouth.",
    parent: "recovery",
    milestones: {5:"breathing_1",10:"breathing_2",20:"breathing_3",40:"breathing_4",80:"breathing_5"}
  },
  mindfulness: {
    name:"Mindfulness",
    description: "Become more aware of your mental state, whats affecting it, and how to improve it.",
    parent: "recovery",
    milestones: {5:"mindfulness_1",10:"mindfulness_2",20:"mindfulness_3",40:"mindfulness_4",80:"mindfulness_5"}
  },

  resting: {
    name:"Resting",
    description:"Do nothing. Faster.",
    parent:null,
    milestones: {5:"resting_1",10:"resting_2",20:"resting_3",40:"resting_4",80:"resting_5"}
  },
  meditation: {
    name: "Meditation",
    description: "Clear your mind and relax. Nobody can agree on what exactly it means to meditate, but whatever you're doing seems to help.",
    parent: "resting",
    milestones: {5:"meditation_1",10:"meditation_2",20:"meditation_3",40:"meditation_4",80:"meditation_5"}
  },
  sleeping: {
    name: "Sleeping",
    description: "Learn to sleep better, because everything's a skill. Get more from your shut-eye.",
    parent: "resting",
    milestones: {5:"sleeping_1",10:"sleeping_2",20:"sleeping_3",40:"sleeping_4",80:"sleeping_5"}
  },

  training: {
    name:"Training",
    description:"Get stronger without risking your life, a revolutionary concept.",
    parent:null,
    milestones: {5:"training_1",10:"training_2",20:"training_3",40:"training_4",80:"training_5"}
  },
  exercise: {
    name:"Exercise",
    description:"Expend physical effort without any clear goal or reward. A luxurious pastime.",
    parent:"training",
    milestones: {5:"exercise_1",10:"exercise_2",20:"exercise_3",40:"exercise_4",80:"exercise_5"}
  },
  sparring: {
    name:"Sparring",
    description:"Fight your friends in a friendly way. Don't go for the kill. Avoid maiming.",
    parent:"training",
    milestones: {5:"sparring_1",10:"sparring_2",20:"sparring_3",40:"sparring_4",80:"sparring_5"}
  },


  traversal: {
    name: "Traversal",
    description: "Move from point A to point B. Do it faster.",
    parent:null,
    milestones: {5:"traversal_1",10:"traversal_2",20:"traversal_3",40:"traversal_4",80:"traversal_5"}
  },
  running: {
    name: "Running",
    description: "Run, run, as fast as you can. Maybe it'll save your life someday",
    parent:"traversal",
    milestones: {5:"running_1",10:"running_2",20:"running_3",40:"running_4",80:"running_5"}
  },
  walking: {
    name: "Walking",
    description: "The difference between a lovely stroll and miserable slog is a thin line. Use the line to lace your boots.",
    parent:"traversal",
    milestones: {5:"walking_1",10:"walking_2",20:"walking_3",40:"walking_4",80:"walking_5"}
  },
  climbing: {
    name: "Climbing",
    description: "Learn how to cling to a vertical surface without exhausting yourself.",
    parent:"traversal",
    milestones: {5:"climbing_1",10:"climbing_2",20:"climbing_3",40:"climbing_4",80:"climbing_5"}
  },


  labour: { 
    name: "Labour",
    parent:null,
    milestones: {5:"labour_1",10:"labour_2",20:"labour_3",40:"labour_4",80:"labour_5"},
  },
  hauling: { 
    name: "Hauling",
    parent: "labour",
    milestones: {5:"hauling_1",10:"hauling_2",20:"hauling_3",40:"hauling_4",80:"hauling_5"},
  },
  gathering: { 
    name: "Gathering",
    parent: "labour",
    milestones: {5:"gathering_1",10:"gathering_2",20:"gathering_3",40:"gathering_4",80:"gathering_5"},
  },
  woodcutting: { 
    name: "Woodcutting",
    parent: "gathering",
    milestones: {5:"woodcutting_1",10:"woodcutting_2",20:"woodcutting_3",40:"woodcutting_4",80:"woodcutting_5"},
  },
  harvesting: { 
    name: "Harvesting",
    parent: "gathering",
    milestones: {5:"harvesting_1",10:"harvesting_2",20:"harvesting_3",40:"harvesting_4",80:"harvesting_5"},
  },
  mining: {
    name: "Mining",
    parent: "gathering",
    milestones: {5:"mining_1",10:"mining_2",20:"mining_3",40:"mining_4",80:"mining_5"},
  },
  fishing: {
    name: "Fishing",
    description: "Convince a creature with a brain the size of a pebble to let you grab it from the water.",
    parent: "gathering",
    milestones: {5:"fishing_1",10:"fishing_2",20:"fishing_3",40:"fishing_4",80:"fishing_5"},
  },


  crafting: {
    name: "Crafting",
    description: "Transform raw materials into something more useful. Hopefully.",
    parent: null,
    milestones: {5:"crafting_1",10:"crafting_2",20:"crafting_3",40:"crafting_4",80:"crafting_5"},
  },
  carpentry: {
    name: "Carpentry",
    description: "Cut wood into smaller pieces and somehow end up with furniture.",
    parent: "crafting",
    milestones: {5:"carpentry_1",10:"carpentry_2",20:"carpentry_3",40:"carpentry_4",80:"carpentry_5"},
  },
  stoneworking: {
    name: "Stoneworking",
    description: "Rock is stubborn. Be more stubborn.",
    parent: "crafting",
    milestones: {5:"stoneworking_1",10:"stoneworking_2",20:"stoneworking_3",40:"stoneworking_4",80:"stoneworking_5"},
  },
  smithing: {
    name: "Smithing",
    description: "Turns out you're not actually meant to heat iron `red-hot`. Temper your expectations",
    parent: "crafting",
    milestones: {5:"smithing_1",10:"smithing_2",20:"smithing_3",40:"smithing_4",80:"smithing_5"},
  },
  cooking: {
    name: "Cooking",
    description: "Improve food through the careful application of heat. Usually.",
    parent: "crafting",
    milestones: {5:"cooking_1",10:"cooking_2",20:"cooking_3",40:"cooking_4",80:"cooking_5"},
  },

};