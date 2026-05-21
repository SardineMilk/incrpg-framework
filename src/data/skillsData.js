export const SKILLS = {

  combat: {
    name: "Combat",
    description: "Pit your mind and body against another in battle.",
    parent: null,
    milestones: {
      3:"battle_hardened_1",
      10:"battle_hardened_2",
      20:"battle_hardened_3",
      35:"battle_hardened_4",
      50:"battle_hardened_5",
      80:"war_master",
      100:"living_weapon",
    }
  },

  weapon_proficiency: {
    name: "Weapon Proficiency",
    description: "Mastery of melee weapons. Wield them as an extension of your body.",
    parent: "combat",
  },

  club: {
    name: "Club Fighting",
    description: "A stick. A hammer. The closest rock. The first weapon ever used, and it holds up today.",
    parent: "weapon_proficiency",
  },
  sword: {
    name: "Sword Fighting",
    description: "A tool of war.",
    parent: "weapon_proficiency",
  },
  dagger: {
    name: "Dagger Fighting",
    description: "Small, pointy object. Learn how and where to poke things.",
    parent: "weapon_proficiency",
  },
  axe: {
    name: "Axe Fighting",
    description: "Splitting limbs is easier than logs.",
    parent: "weapon_proficiency",
  },
  spear: {
    name: "Spear Fighting",
    description: "A versatile and effective weapon. Keep your distance and poke.",
    parent: "weapon_proficiency",
  },

  ranged: {
    name: "Ranged",
    description: "The art of accelerating objects towards a target.",
    parent: "combat",
  },

  archery: {
    name: "Archery",
    description: "Use a bow to shoot an arrow. Surprisingly tricky, but effective. If you have arrows.",
    parent: "ranged",
  },
  throwing: {
    name: "Throwing",
    description: "Humanoid creatures are uniquely suited to throwing stuff. Exploit this advantage.",
    parent: "ranged",
  },

  unarmed: {
    name: "Unarmed",
    description: "Fight without using a weapon. You're not a cheater.",
    parent: "combat",
    milestones: {
      5: "pugilist_1",
      10: "pugilist_2",
      20: "pugilist_3",
      40: "pugilist_4",
      80: "pugilist_5",
    }
  },

  recovery: {
    name:"Recovery",
    description:"Restore yourself to peak condition. Should you be proud of this skill?",
    parent: null,
  },
  regeneration: {
    name: "Regeneration",
    description: "If you keep getting hurt, your body learns to heal faster. Thats how it works.",
    parent: "recovery",
  },  
  breathing: {
    name: "Breathing",
    description: "You're breathing wrong. In through the nose. Bring air down to the belly. Out through the mouth.",
    parent: "recovery",
  },
  mindfulness: {
    name:"Mindfulness",
    description: "Become more aware of your mental state, whats affecting it, and how to improve it.",
    parent: "recovery",
  },

  resting: {
    name:"Resting",
    description:"Do nothing. Faster.",
    parent: null,
  },
  meditation: {
    name: "Meditation",
    description: "Clear your mind and relax. Nobody can agree on what exactly it means to meditate, but whatever you're doing seems to help.",
    parent: "resting",
  },
  meditation: {
    name: "Sleeping",
    description: "Learn to sleep better, because everything's a skill. Get more from your shut-eye.",
    parent: "resting",
  },

  training: {
    name:"Training",
    description:"Get stronger without risking your life, a revolutionary concept.",
    parent:null,
  },
  exercise: {
    name:"Exercise",
    description:"Expend physical effort without any clear goal or reward. A luxurious pastime.",
    parent:"training",
  },
  sparring: {
    name:"Sparring",
    description:"Fight your friends in a friendly way. Don't go for the kill. Avoid maiming.",
    parent:"training",
  },

  running: {
    name: "Running",
    description: "Maybe it'll save your life someday",
    parent: null,
  }
};