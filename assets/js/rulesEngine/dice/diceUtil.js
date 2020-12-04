// diceUtil.js

/**
 * List of known dice types
 * @readonly
 * @enum {string}
 */
export const DiceTypes = Object.freeze({
    /** @member {string} */
    d4: 'd4',
    /** @member {string} */
    d6: 'd6',
    /** @member {string} */
    d8: 'd8',
    /** @member {string} */
    d10: 'd10',
    /** @member {string} */
    d12: 'd12',
    /** @member {string} */
    d20: 'd20',
    /** a custom dice type which will require min and max
     * @member {string} */
    'd?': 'd?',
})

export class DiceDescriptor {
    /** @constructor
     * @param {DiceTypes} diceType The type of dice being rolled
     * @param {number} [min] The minimum possible value for a single roll
     * @param {number} [max] The maximum possible value for a signle roll
     */
    constructor(diceType, min, max) {
        if (!diceType) diceType = DiceTypes.d4
        if (diceType !== DiceTypes['d?']) {
            min = 1
            switch (diceType) {
                case DiceTypes.d4:
                    max = 4
                    break
                case DiceTypes.d6:
                    max = 6
                    break
                case DiceTypes.d8:
                    max = 8
                    break
                case DiceTypes.d10:
                    max = 10
                    break
                case DiceTypes.d12:
                    max = 12
                    break
                case DiceTypes.d20:
                    max = 20
                    break
            }
        }
        if (min === null || min === undefined) min = 1
        if (!max) max = 6
        if (max < min) {
            const tmp = min
            min = max
            max = tmp
        }
        this.diceType = diceType
        this.min = Number(min)
        this.max = Number(max)
    }
}

/** @typedef {Object} DiceRollResult
 * @property {number} count The number of rolls in the result
 * @property {DiceDescriptor} dice The dice to be rolled
 * @property {number} modifier The modifier to add to the base result
 * @property {string} diceDisplay The textual display of the dice
 * @property {number[]} rolls The individual roll values
 * @property {number} subTotal The sum of the individual rolls
 * @property {number} total The subTotal + the modifier
 */

/**
 * Dice utilities class
 * @property {DiceTypes} diceTypes
 */
export default class DiceUtil {
    /**
     * Generaes a display of the dice request parameters
     * @param {number} count count The number of rolls to make
     * @param {DiceDescriptor} dice The type of dice being rolled
     * @param {number} modifier The modifier to add to the base result
     * @returns {string} the display value for the count, dice and modifier
     */
    getDiceDisplayText(count, dice, modifier) {
        if (!dice) dice = new DiceDescriptor(DiceTypes.d6)
        if (!count) count = 1
        const diceText =
            dice.min !== 1 ? `(${dice.min} to ${dice.max})` : `${dice.max}`
        const modText =
            modifier && modifier > 0
                ? `+${modifier}`
                : modifier < 0
                ? `${modifier}`
                : ''
        return `${count || 0}d${diceText}${modText}`
    }

    /**
     * Determines if the dice roll parameters are valid
     * @param {number} count count The number of rolls to make
     * @param {DiceDescriptor} dice The type of dice being rolled
     * @param {number} modifier The modifier to add to the base result
     * @returns {boolean} Whether the parameters are valid
     */
    isValidRollRequest(count, dice, modifier) {
        if (!count || !dice) return false
        if (count < 1) return false
        return true
    }

    /**
     * Rolls dice with modifier
     * @param {number} count count The number of rolls to make
     * @param {DiceDescriptor} dice The type of dice being rolled
     * @param {number} modifier The modifier to add to the base result
     * @returns {DiceRollResult} the result with the rolls and totals
     */
    rollDice(count, dice, modifier) {
        if (!this.isValidRollRequest(count, dice, modifier)) {
            throw new Error('Invalid roll request')
        }
        count = Number(count)
        modifier = Number(modifier)
        const result = {
            count,
            dice,
            modifier,
            diceDisplay: this.getDiceDisplayText(count, dice, modifier),
            rolls: [],
            subTotal: 0,
            total: 0,
        }
        for (let die = 0; die < count; die++) {
            const roll =
                Math.floor(Math.random() * (dice.max - dice.min + 1)) + dice.min
            result.subTotal += roll
            result.rolls.push(roll)
        }
        result.total = result.subTotal + result.modifier
        return result
    }
}
