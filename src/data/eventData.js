import { req } from "../game/requirements.js"
import { eff } from "../game/effects.js"
import { evt } from "../game/events.js"

export const EVENT_EFFECTS = {
    health_regen: {
        event: [
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
        event: [
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
        event: [
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
        event: [
            evt.resourceDropsBelowThreshold("health", 0),
            evt.resourceDropsBelowThreshold("stamina", 0),
            evt.resourceDropsBelowThreshold("mental", 0),
        ],
        effects: [
            eff.setActiveAction("sleeping"),
            eff.sendMessage("SYSTEM", "You pass out"),
        ]
    }
}