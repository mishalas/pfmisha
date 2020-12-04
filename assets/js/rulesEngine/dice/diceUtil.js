// diceUtil.js

/** @typedef {Object} DiceRollResult
 * @property {number} count The number of rolls in the result
 * @property {number} min The minimum possible value for a single roll
 * @property {number} max The maximum possible value for a signle roll
 * @property {number} mod The modifier to add to the base result
 * @property {string} diceDisplay The textual display of the dice
 * @property {number[]} rolls The individual roll values
 * @property {number} subTotal The sum of the individual rolls
 * @property {number} total The subTotal + the modifier
 */

const diceType = Object.freeze({
    d4: 'd4',
    d6: 'd6',
    d8: 'd8',
    d12: 'd12',
    d20: 'd20',
    'd?': 'd?',
})

/**
 * Dice utilities class
 */
export default class DiceUtil {
    constructor() {
        this.diceType = diceType
    }

    /**
     * Determines if the dice roll parameters are valid
     * @param {*} count count The number of rolls to make
     * @param {*} min The minimum possible value for a single roll
     * @param {*} max The maximum possible value for a signle roll
     * @param {*} mod The modifier to add to the base result
     * @returns {boolean} Whether the parameters are valid
     */
    isValidRollRequest(count, min, max, mod) {
        if (!count || !min || !max) return false
        if (count < 1) return false
        if (min < 1 || min >= max) return false
        if (max <= min) return false
        return true
    }

    /**
     * Rolls dice with modifier
     * @param {*} count count The number of rolls to make
     * @param {*} min The minimum possible value for a single roll
     * @param {*} max The maximum possible value for a signle roll
     * @param {*} mod The modifier to add to the base result
     * @returns {DiceRollResult}
     */
    rollDice(count, min, max, mod) {
        if (!this.isValidRollRequest(count, min, max, mod)) {
            throw new Error('Invalid roll request')
        }
        const result = {
            min,
            max,
            count,
            mod,
            diceDisplay: this.getDiceDisplayText(count, min, max, mod),
            rolls: [],
            subTotal: 0,
            total: 0,
        }
        for (let die = 0; die < count; die++) {
            const roll = min + Math.floor(Math.random() * max)
            result.subTotal += roll
            result.rolls.push(roll)
        }
        result.total = result.subTotal + result.mod
        return result
    }

    /**
     * Generaes a display of the dice request parameters
     * @param {*} count count The number of rolls to make
     * @param {*} min The minimum possible value for a single roll
     * @param {*} max The maximum possible value for a signle roll
     * @param {*} mod The modifier to add to the base result
     * @returns {DiceRollResult}
     */
    getDiceDisplayText(count, min, max, mod) {
        const diceText = min && min !== 1 ? `${min} to ${max}` : `${max}`
        const modText = mod && mod > 0 ? `+${mod}` : mod < 0 ? `${mod}` : ''
        return `${count}d${diceText}${modText}`
    }
}
