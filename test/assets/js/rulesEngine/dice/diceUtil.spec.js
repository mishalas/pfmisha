// diceUtils.spec.js

import DiceUtil from '~/assets/js/rulesEngine/dice/diceUtil'

const diceUtil = new DiceUtil()

describe('DiceUtil tests', () => {
    describe('getDiceDisplayText() tests', () => {
        it('Returns default display for null arguments', () => {
            expect(diceUtil.getDiceDisplayText(null, null, null)).toEqual('1d6')
        })
    })

    describe('isValidRollRequest() tests', () => {})
})
