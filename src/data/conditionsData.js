import { req, eff, evt } from "./structure.js"


const TRAITS = {
    /* Combat */
    combat_1: { name: "Battle Hardened I", description: "Basic combat familiarity. Slightly more XP from combat actions.", effects:[ eff.skillXpMultiplier("combat", 10) ],},
    combat_2: { name: "Battle Hardened II", description: "Greater combat experience. More XP from combat actions.", effects:[ eff.skillXpMultiplier("combat", 20) ],},
    combat_3: { name: "Battle Hardened III", description: "Seasoned fighter. Combat actions grant bonus XP.", effects:[ eff.skillXpMultiplier("combat", 40) ],},
    combat_4: { name: "Battle Hardened IV", description: "Veteran of many fights. Large XP bonuses to combat.", effects:[ eff.skillXpMultiplier("combat", 75) ],},
    combat_5: { name: "Battle Hardened V", description: "A true combat specialist. Combat related XP is greatly increased.", effects:[ eff.skillXpMultiplier("combat", 150) ],},

    /* Weapon proficiency */
    weapon_proficiency_1: { name: "Weapon Novice I", description:"Basic handling of melee weapons.", effects:[ eff.skillXpMultiplier("weapon_proficiency",10) ]},
    weapon_proficiency_2: { name: "Weapon Novice II", description:"Improved melee handling.", effects:[ eff.skillXpMultiplier("weapon_proficiency",20) ]},
    weapon_proficiency_3: { name: "Weapon Adept I", description:"Good control of melee weapons.", effects:[ eff.skillXpMultiplier("weapon_proficiency",40) ]},
    weapon_proficiency_4: { name: "Weapon Adept II", description:"Very skilled with melee weapons.", effects:[ eff.skillXpMultiplier("weapon_proficiency",75) ]},
    weapon_proficiency_5: { name: "Weapon Master", description:"Master of melee weapons.", effects:[ eff.skillXpMultiplier("weapon_proficiency",150) ]},

    club_1: { name: "Club Novice I", description:"Basic club techniques.", effects:[ eff.skillXpMultiplier("club",10) ]},
    club_2: { name: "Club Novice II", description:"Improved club techniques.", effects:[ eff.skillXpMultiplier("club",20) ]},
    club_3: { name: "Club Adept I", description:"Good club control.", effects:[ eff.skillXpMultiplier("club",40) ]},
    club_4: { name: "Club Adept II", description:"Strong club techniques.", effects:[ eff.skillXpMultiplier("club",75) ]},
    club_5: { name: "Club Master", description:"Master of club fighting.", effects:[ eff.skillXpMultiplier("club",150) ]},

    sword_1: { name: "Sword Novice I", description:"Basic sword swings.", effects:[ eff.skillXpMultiplier("sword",10) ]},
    sword_2: { name: "Sword Novice II", description:"Improved sword handling.", effects:[ eff.skillXpMultiplier("sword",20) ]},
    sword_3: { name: "Sword Adept I", description:"Good sword techniques.", effects:[ eff.skillXpMultiplier("sword",40) ]},
    sword_4: { name: "Sword Adept II", description:"Very skilled with the sword.", effects:[ eff.skillXpMultiplier("sword",75) ]},
    sword_5: { name: "Swordmaster", description:"A master swordsman.", effects:[ eff.skillXpMultiplier("sword",150) ]},

    dagger_1: { name: "Dagger Novice I", description:"Basic dagger skills.", effects:[ eff.skillXpMultiplier("dagger",10) ]},
    dagger_2: { name: "Dagger Novice II", description:"Improved dagger use.", effects:[ eff.skillXpMultiplier("dagger",20) ]},
    dagger_3: { name: "Dagger Adept I", description:"Good dagger techniques.", effects:[ eff.skillXpMultiplier("dagger",40) ]},
    dagger_4: { name: "Dagger Adept II", description:"Very skilled with daggers.", effects:[ eff.skillXpMultiplier("dagger",75) ]},
    dagger_5: { name: "Daggermaster", description:"Master of the dagger.", effects:[ eff.skillXpMultiplier("dagger",150) ]},

    axe_1: { name: "Axe Novice I", description:"Basic axe handling.", effects:[ eff.skillXpMultiplier("axe",10) ]},
    axe_2: { name: "Axe Novice II", description:"Improved axe strikes.", effects:[ eff.skillXpMultiplier("axe",20) ]},
    axe_3: { name: "Axe Adept I", description:"Good axe techniques.", effects:[ eff.skillXpMultiplier("axe",40) ]},
    axe_4: { name: "Axe Adept II", description:"Strong axe mastery.", effects:[ eff.skillXpMultiplier("axe",75) ]},
    axe_5: { name: "Axemaster", description:"Master of the axe.", effects:[ eff.skillXpMultiplier("axe",150) ]},

    spear_1: { name: "Spear Novice I", description:"Basic spear use.", effects:[ eff.skillXpMultiplier("spear",10) ]},
    spear_2: { name: "Spear Novice II", description:"Improved spear reach.", effects:[ eff.skillXpMultiplier("spear",20) ]},
    spear_3: { name: "Spear Adept I", description:"Good spear techniques.", effects:[ eff.skillXpMultiplier("spear",40) ]},
    spear_4: { name: "Spear Adept II", description:"Very skilled with the spear.", effects:[ eff.skillXpMultiplier("spear",75) ]},
    spear_5: { name: "Spearmaster", description:"Master of spear combat.", effects:[ eff.skillXpMultiplier("spear",150) ]},

    /* Ranged */
    ranged_1: { name: "Ranged Novice I", description:"Basic ranged basics.", effects:[ eff.skillXpMultiplier("ranged",10) ]},
    ranged_2: { name: "Ranged Novice II", description:"Improved ranged technique.", effects:[ eff.skillXpMultiplier("ranged",20) ]},
    ranged_3: { name: "Ranged Adept I", description:"Good ranged control.", effects:[ eff.skillXpMultiplier("ranged",40) ]},
    ranged_4: { name: "Ranged Adept II", description:"Very skilled at ranged combat.", effects:[ eff.skillXpMultiplier("ranged",75) ]},
    ranged_5: { name: "Ranged Master", description:"Master of distance fighting.", effects:[ eff.skillXpMultiplier("ranged",150) ]},

    archery_1: { name: "Archer I", description:"Basic archery.", effects:[ eff.skillXpMultiplier("archery",10) ]},
    archery_2: { name: "Archer II", description:"Improved archery.", effects:[ eff.skillXpMultiplier("archery",20) ]},
    archery_3: { name: "Archer III", description:"Skilled archer.", effects:[ eff.skillXpMultiplier("archery",40) ]},
    archery_4: { name: "Archer IV", description:"Expert archer.", effects:[ eff.skillXpMultiplier("archery",75) ]},
    archery_5: { name: "Master Archer", description:"Master archer.", effects:[ eff.skillXpMultiplier("archery",150) ]},

    throwing_1: { name: "Thrower I", description:"Basic throwing.", effects:[ eff.skillXpMultiplier("throwing",10) ]},
    throwing_2: { name: "Thrower II", description:"Improved throwing.", effects:[ eff.skillXpMultiplier("throwing",20) ]},
    throwing_3: { name: "Thrower III", description:"Skilled at throwing.", effects:[ eff.skillXpMultiplier("throwing",40) ]},
    throwing_4: { name: "Thrower IV", description:"Expert thrower.", effects:[ eff.skillXpMultiplier("throwing",75) ]},
    throwing_5: { name: "Master Thrower", description:"Master of thrown weapons.", effects:[ eff.skillXpMultiplier("throwing",150) ]},

    /* Unarmed */
    unarmed_1: { name: "Pugilist I", description:"Basic unarmed techniques.", effects:[ eff.skillXpMultiplier("unarmed",10) ]},
    unarmed_2: { name: "Pugilist II", description:"Improved unarmed control.", effects:[ eff.skillXpMultiplier("unarmed",20) ]},
    unarmed_3: { name: "Pugilist III", description:"Skilled unarmed fighter.", effects:[ eff.skillXpMultiplier("unarmed",40) ]},
    unarmed_4: { name: "Pugilist IV", description:"Expert unarmed combatant.", effects:[ eff.skillXpMultiplier("unarmed",75) ]},
    unarmed_5: { name: "Pugilist V", description:"Master of unarmed combat.", effects:[ eff.skillXpMultiplier("unarmed",150) ]},

    /* Recovery */
    recovery_1: { name: "Recoverer I", description:"Basic recovery knowledge.", effects:[ eff.skillXpMultiplier("recovery",10) ]},
    recovery_2: { name: "Recoverer II", description:"Improved recovery.", effects:[ eff.skillXpMultiplier("recovery",20) ]},
    recovery_3: { name: "Recoverer III", description:"Good recovery techniques.", effects:[ eff.skillXpMultiplier("recovery",40) ]},
    recovery_4: { name: "Recoverer IV", description:"Very effective recovery.", effects:[ eff.skillXpMultiplier("recovery",75) ]},
    recovery_5: { name: "Recoverer V", description:"Master of recovery.", effects:[ eff.skillXpMultiplier("recovery",150) ]},

    regeneration_1: { name: "Regenerator I", description:"Minor passive healing improvements.", effects:[ eff.skillXpMultiplier("regeneration",10) ]},
    regeneration_2: { name: "Regenerator II", description:"Improved regeneration.", effects:[ eff.skillXpMultiplier("regeneration",20) ]},
    regeneration_3: { name: "Regenerator III", description:"Good regeneration.", effects:[ eff.skillXpMultiplier("regeneration",40) ]},
    regeneration_4: { name: "Regenerator IV", description:"Strong regenerative ability.", effects:[ eff.skillXpMultiplier("regeneration",75) ]},
    regeneration_5: { name: "Regenerator V", description:"Master of regeneration.", effects:[ eff.skillXpMultiplier("regeneration",150) ]},

    breathing_1: { name: "Breather I", description:"Basic breathing control.", effects:[ eff.skillXpMultiplier("breathing",10) ]},
    breathing_2: { name: "Breather II", description:"Improved breathwork.", effects:[ eff.skillXpMultiplier("breathing",20) ]},
    breathing_3: { name: "Breather III", description:"Good breathing techniques.", effects:[ eff.skillXpMultiplier("breathing",40) ]},
    breathing_4: { name: "Breather IV", description:"Expert breath control.", effects:[ eff.skillXpMultiplier("breathing",75) ]},
    breathing_5: { name: "Breather V", description:"Master of breathwork.", effects:[ eff.skillXpMultiplier("breathing",150) ]},

    mindfulness_1: { name: "Mindful I", description:"Basic mindfulness.", effects:[ eff.skillXpMultiplier("mindfulness",10) ]},
    mindfulness_2: { name: "Mindful II", description:"Improved awareness.", effects:[ eff.skillXpMultiplier("mindfulness",20) ]},
    mindfulness_3: { name: "Mindful III", description:"Good mindfulness skills.", effects:[ eff.skillXpMultiplier("mindfulness",40) ]},
    mindfulness_4: { name: "Mindful IV", description:"Strong mental clarity.", effects:[ eff.skillXpMultiplier("mindfulness",75) ]},
    mindfulness_5: { name: "Mindful V", description:"Master of mindfulness.", effects:[ eff.skillXpMultiplier("mindfulness",150) ]},

    /* Resting */
    resting_1: { name: "Resting I", description:"Basic rest efficiency.", effects:[ eff.skillXpMultiplier("resting",10) ]},
    resting_2: { name: "Resting II", description:"Improved rest.", effects:[ eff.skillXpMultiplier("resting",20) ]},
    resting_3: { name: "Resting III", description:"Good resting techniques.", effects:[ eff.skillXpMultiplier("resting",40) ]},
    resting_4: { name: "Resting IV", description:"Very effective resting.", effects:[ eff.skillXpMultiplier("resting",75) ]},
    resting_5: { name: "Resting V", description:"Master of rest.", effects:[ eff.skillXpMultiplier("resting",150) ]},

    meditation_1: { name: "Meditator I", description:"Basic meditation.", effects:[ eff.skillXpMultiplier("meditation",10) ]},
    meditation_2: { name: "Meditator II", description:"Improved meditation.", effects:[ eff.skillXpMultiplier("meditation",20) ]},
    meditation_3: { name: "Meditator III", description:"Skilled meditator.", effects:[ eff.skillXpMultiplier("meditation",40) ]},
    meditation_4: { name: "Meditator IV", description:"Expert meditation.", effects:[ eff.skillXpMultiplier("meditation",75) ]},
    meditation_5: { name: "Meditator V", description:"Master of meditation.", effects:[ eff.skillXpMultiplier("meditation",150) ]},

    sleeping_1: { name: "Sleeper I", description:"Basic sleep improvements.", effects:[ eff.skillXpMultiplier("sleeping",10) ]},
    sleeping_2: { name: "Sleeper II", description:"Better sleep.", effects:[ eff.skillXpMultiplier("sleeping",20) ]},
    sleeping_3: { name: "Sleeper III", description:"Good sleep habits.", effects:[ eff.skillXpMultiplier("sleeping",40) ]},
    sleeping_4: { name: "Sleeper IV", description:"Great sleep efficiency.", effects:[ eff.skillXpMultiplier("sleeping",75) ]},
    sleeping_5: { name: "Sleeper V", description:"Master of sleep.", effects:[ eff.skillXpMultiplier("sleeping",150) ]},

    /* Training */
    training_1: { name: "Trainee I", description:"Basic training efficiency.", effects:[ eff.skillXpMultiplier("training",10) ]},
    training_2: { name: "Trainee II", description:"Improved training.", effects:[ eff.skillXpMultiplier("training",20) ]},
    training_3: { name: "Trainee III", description:"Good training techniques.", effects:[ eff.skillXpMultiplier("training",40) ]},
    training_4: { name: "Trainee IV", description:"Very efficient training.", effects:[ eff.skillXpMultiplier("training",75) ]},
    training_5: { name: "Trainer", description:"Master of training.", effects:[ eff.skillXpMultiplier("training",150) ]},

    exercise_1: { name: "Exerciser I", description:"Basic exercise gains.", effects:[ eff.skillXpMultiplier("exercise",10) ]},
    exercise_2: { name: "Exerciser II", description:"Improved exercise gains.", effects:[ eff.skillXpMultiplier("exercise",20) ]},
    exercise_3: { name: "Exerciser III", description:"Skilled exerciser.", effects:[ eff.skillXpMultiplier("exercise",40) ]},
    exercise_4: { name: "Exerciser IV", description:"Expert at exercise.", effects:[ eff.skillXpMultiplier("exercise",75) ]},
    exercise_5: { name: "Exercise Master", description:"Master of exercise.", effects:[ eff.skillXpMultiplier("exercise",150) ]},

    sparring_1: { name: "Sparring I", description:"Basic sparring.", effects:[ eff.skillXpMultiplier("sparring",10) ]},
    sparring_2: { name: "Sparring II", description:"Improved sparring.", effects:[ eff.skillXpMultiplier("sparring",20) ]},
    sparring_3: { name: "Sparring III", description:"Skilled sparrer.", effects:[ eff.skillXpMultiplier("sparring",40) ]},
    sparring_4: { name: "Sparring IV", description:"Expert sparring.", effects:[ eff.skillXpMultiplier("sparring",75) ]},
    sparring_5: { name: "Sparring V", description:"Master of sparring.", effects:[ eff.skillXpMultiplier("sparring",150) ]},

    /* Traversal */
    traversal_1: { name: "Traveler I", description:"Basic movement improvements.", effects:[ eff.skillXpMultiplier("traversal",10) ]},
    traversal_2: { name: "Traveler II", description:"Improved traversal.", effects:[ eff.skillXpMultiplier("traversal",20) ]},
    traversal_3: { name: "Traveler III", description:"Skilled traverser.", effects:[ eff.skillXpMultiplier("traversal",40) ]},
    traversal_4: { name: "Traveler IV", description:"Expert traversal.", effects:[ eff.skillXpMultiplier("traversal",75) ]},
    traversal_5: { name: "Traveler V", description:"Master of traversal.", effects:[ eff.skillXpMultiplier("traversal",150) ]},

    running_1: { name: "Runner I", description:"Basic running skill.", effects:[ eff.skillXpMultiplier("running",10) ]},
    running_2: { name: "Runner II", description:"Improved running.", effects:[ eff.skillXpMultiplier("running",20) ]},
    running_3: { name: "Runner III", description:"Skilled runner.", effects:[ eff.skillXpMultiplier("running",40) ]},
    running_4: { name: "Runner IV", description:"Fast runner.", effects:[ eff.skillXpMultiplier("running",75) ]},
    running_5: { name: "Runner V", description:"Master runner.", effects:[ eff.skillXpMultiplier("running",150) ]},

    walking_1: { name: "Walker I", description:"Basic walking efficiency.", effects:[ eff.skillXpMultiplier("walking",10) ]},
    walking_2: { name: "Walker II", description:"Improved walking.", effects:[ eff.skillXpMultiplier("walking",20) ]},
    walking_3: { name: "Walker III", description:"Skilled walker.", effects:[ eff.skillXpMultiplier("walking",40) ]},
    walking_4: { name: "Walker IV", description:"Expert walking.", effects:[ eff.skillXpMultiplier("walking",75) ]},
    walking_5: { name: "Walker V", description:"Master walker.", effects:[ eff.skillXpMultiplier("walking",150) ]},

    climbing_1: { name: "Climber I", description:"Basic climbing.", effects:[ eff.skillXpMultiplier("climbing",10) ]},
    climbing_2: { name: "Climber II", description:"Improved climbing.", effects:[ eff.skillXpMultiplier("climbing",20) ]},
    climbing_3: { name: "Climber III", description:"Skilled climber.", effects:[ eff.skillXpMultiplier("climbing",40) ]},
    climbing_4: { name: "Climber IV", description:"Expert climbing.", effects:[ eff.skillXpMultiplier("climbing",75) ]},
    climbing_5: { name: "Climber V", description:"Master climber.", effects:[ eff.skillXpMultiplier("climbing",150) ]},

    /* Labour / gathering */
    labour_1: { name: "Labourer I", description:"Basic labour efficiency.", effects:[ eff.skillXpMultiplier("labour",10) ]},
    labour_2: { name: "Labourer II", description:"Improved labour.", effects:[ eff.skillXpMultiplier("labour",20) ]},
    labour_3: { name: "Labourer III", description:"Skilled labourer.", effects:[ eff.skillXpMultiplier("labour",40) ]},
    labour_4: { name: "Labourer IV", description:"Very efficient labour.", effects:[ eff.skillXpMultiplier("labour",75) ]},
    labour_5: { name: "Labourer V", description:"Master of labour.", effects:[ eff.skillXpMultiplier("labour",150) ]},

    hauling_1: { name: "Hauler I", description:"Basic hauling.", effects:[ eff.skillXpMultiplier("hauling",10) ]},
    hauling_2: { name: "Hauler II", description:"Improved hauling.", effects:[ eff.skillXpMultiplier("hauling",20) ]},
    hauling_3: { name: "Hauler III", description:"Skilled hauler.", effects:[ eff.skillXpMultiplier("hauling",40) ]},
    hauling_4: { name: "Hauler IV", description:"Expert hauling.", effects:[ eff.skillXpMultiplier("hauling",75) ]},
    hauling_5: { name: "Hauler V", description:"Master of hauling.", effects:[ eff.skillXpMultiplier("hauling",150) ]},

    gathering_1: { name: "Gatherer I", description:"Basic gathering.", effects:[ eff.skillXpMultiplier("gathering",10) ]},
    gathering_2: { name: "Gatherer II", description:"Improved gathering.", effects:[ eff.skillXpMultiplier("gathering",20) ]},
    gathering_3: { name: "Gatherer III", description:"Skilled gatherer.", effects:[ eff.skillXpMultiplier("gathering",40) ]},
    gathering_4: { name: "Gatherer IV", description:"Expert gathering.", effects:[ eff.skillXpMultiplier("gathering",75) ]},
    gathering_5: { name: "Gatherer V", description:"Master gatherer.", effects:[ eff.skillXpMultiplier("gathering",150) ]},

    woodcutting_1: { name: "Lumber I", description:"Basic woodcutting.", effects:[ eff.skillXpMultiplier("woodcutting",10) ]},
    woodcutting_2: { name: "Lumber II", description:"Improved woodcutting.", effects:[ eff.skillXpMultiplier("woodcutting",20) ]},
    woodcutting_3: { name: "Lumber III", description:"Skilled woodcutter.", effects:[ eff.skillXpMultiplier("woodcutting",40) ]},
    woodcutting_4: { name: "Lumber IV", description:"Expert woodcutting.", effects:[ eff.skillXpMultiplier("woodcutting",75) ]},
    woodcutting_5: { name: "Lumber V", description:"Master woodcutter.", effects:[ eff.skillXpMultiplier("woodcutting",150) ]},

    harvesting_1: { name: "Harvester I", description:"Basic harvesting.", effects:[ eff.skillXpMultiplier("harvesting",10) ]},
    harvesting_2: { name: "Harvester II", description:"Improved harvesting.", effects:[ eff.skillXpMultiplier("harvesting",20) ]},
    harvesting_3: { name: "Harvester III", description:"Skilled harvester.", effects:[ eff.skillXpMultiplier("harvesting",40) ]},
    harvesting_4: { name: "Harvester IV", description:"Expert harvesting.", effects:[ eff.skillXpMultiplier("harvesting",75) ]},
    harvesting_5: { name: "Harvester V", description:"Master harvester.", effects:[ eff.skillXpMultiplier("harvesting",150) ]},

    mining_1: { name: "Miner I", description:"Basic mining.", effects:[ eff.skillXpMultiplier("mining",10) ]},
    mining_2: { name: "Miner II", description:"Improved mining.", effects:[ eff.skillXpMultiplier("mining",20) ]},
    mining_3: { name: "Miner III", description:"Skilled miner.", effects:[ eff.skillXpMultiplier("mining",40) ]},
    mining_4: { name: "Miner IV", description:"Expert mining.", effects:[ eff.skillXpMultiplier("mining",75) ]},
    mining_5: { name: "Miner V", description:"Master miner.", effects:[ eff.skillXpMultiplier("mining",150) ]},

    /* Unarmed + Unarmored */
    brawler: {
        name: "Brawler",
        description: "Fight without armor or a weapon. Float like a leaf, hit like a boulder.",
        effects:[],
    },
}


const EVENT_EFFECTS = {
    health_regen: {
        triggers: [
            evt.tick(),
        ],
        requirements: [
            req.resourceLessThan("health", -1),
        ],
        effects: [
            eff.changeResource("health", 0.1),
            eff.grantSkillXp("regeneration", 0.1),
        ],
    },
    stamina_regen: {
        triggers: [
            evt.tick(),
        ],
        requirements: [
            req.resourceLessThan("stamina", -1),
        ],
        effects: [
            eff.changeResource("stamina", 0.1),
            eff.grantSkillXp("breathing", 0.1),
        ],
    },
    mental_regen: {
        triggers: [
            evt.tick(),
        ],
        requirements: [
            req.resourceLessThan("mental", -1),
        ],
        effects: [
            eff.changeResource("mental", 0.1),
            eff.grantSkillXp("mindfulness", 0.1),
        ],
    },


    death: {
        triggers: [
            evt.resourceLoss("health"),
            evt.resourceLoss("stamina"),
            evt.resourceLoss("mental"),
        ],
        requirements: [
            [
                req.resourceLessThan("health", 0),
                req.resourceLessThan("stamina", 0),
                req.resourceLessThan("mental", 0),
            ]
        ],
        effects: [
            eff.setActiveAction("sleeping"),
            eff.sendMessage("SYSTEM", "You pass out"),
        ]
    },
     

}

const TEMP_CONDITIONS = {
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
        effects: [
            eff.changeResource("stamina", -1),
            eff.changeResource("mental", -1),
        ],
    },
}



export const CONDITIONS = Object.assign({}, TEMP_CONDITIONS, TRAITS, EVENT_EFFECTS);
