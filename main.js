class Skill {
    constructor(id, pretty_name) {
        this.id = id;
        this.pretty_name = pretty_name;
        this.xp = 0;
        this.cost_scaling = 1.5;
        this.max_level = 100;
        
        this.gain_multipliers = [];
        this.gain = 1;
    }

    static getXPForLevel(level, scaling_factor) {
        /* XP to reach start of level */
        return 100 * (scaling_factor ** (level-1))
    }

    static getLevelForXP(xp, scaling_factor) {
        /* Level reached by xp, rounded down */
        if (xp < 100) return 0;

        return Math.floor(
            Math.log(xp / 100) / Math.log(scaling_factor)
        ) + 1;
    }

    static calculateGain(gain_multipliers) {
        let gain = 1;
        for (multiplier in gain_multipliers) {
            gain *= multiplier;
        }
        return gain;
    }

    getName() {
        return this.pretty_name;
    }

    getLevel() {
        /* Current level */
        return getLevelForXP(this.xp, this.cost_scaling)
    }

    getXPForCurrentLevel() {
        /* XP to reach start of current level */
        return getXPForLevel(this.level, this.cost_scaling);
    }

    getXPForNextLevel() {
        /* XP to reach start of next level */
        return getXPForLevel(this.level+1, this.cost_scaling);
    }

    getXPIntoLevel() {
        /* XP accumulated since start of current level*/
        return this.xp - this.getXPForLevel()
    }

    getXPToNextLevel() {
        /* XP until next level*/
        return this.getXPForNextLevel() - this.xp
    }


    gainXP(xp) {
        this.xp += xp * this.gain;
    }
}


let ticksPerSecond = 20;

setInterval(gameTick, 1000/ticksPerSecond);

function gameTick() {

}