<template>
    <v-card>
        <v-card-title class="utility-card-title">Dice Roller</v-card-title>
        <v-card-subtitle class="utility-card-subtitle">{{
            diceRequestDisplay
        }}</v-card-subtitle>
        <v-card-actions class="utility-card-actions">
            <v-text-field
                v-model="count"
                label="Count"
                type="number"
                min="1"
                class="short-number-input"
            ></v-text-field>
            <v-select
                v-model="diceType"
                label="Dice"
                :items="diceTypes"
                class="dice-type-select"
            >
            </v-select>
            <v-text-field
                v-if="diceType === 'd?'"
                v-model="min"
                label="Min"
                type="number"
                min="0"
                class="short-number-input"
            ></v-text-field>
            <v-text-field
                v-if="diceType === 'd?'"
                v-model="max"
                label="Max"
                type="number"
                min="1"
                class="short-number-input"
            ></v-text-field>
            <v-text-field
                v-model="modifier"
                label="Mod"
                type="number"
                class="short-number-input"
            ></v-text-field>
            <v-btn
                class="utility-action-button roll-btn"
                @click="onRollBtnClick"
                >Roll</v-btn
            >
            <label>&nbsp;=&nbsp;</label>
            <v-text-field
                v-model="total"
                label="Total"
                type="number"
                readonly
                class="total-text"
            ></v-text-field>
        </v-card-actions>
        <v-card-text>
            <v-chip-group column>
                <v-chip
                    v-for="(roll, index) in rolls"
                    :key="index"
                    label
                    outlined
                    >{{ roll }}</v-chip
                >
            </v-chip-group>
        </v-card-text>
    </v-card>
</template>

<script>
import rulesEngine, {
    DiceDescriptor,
    DiceTypes,
} from '~/assets/js/rulesEngine/rulesEngine'
export default {
    data() {
        return {
            count: 1,
            diceTypes: Object.entries(DiceTypes).map(([key, value]) => {
                return { text: key, value }
            }),
            diceType: 'd6',
            min: 0,
            max: 0,
            modifier: 0,
            rollResult: null,
        }
    },
    computed: {
        dice() {
            const dice = new DiceDescriptor(this.diceType, this.min, this.max)
            return dice
        },
        diceRequestDisplay() {
            return rulesEngine.diceUtil.getDiceDisplayText(
                this.count,
                this.dice,
                this.modifier
            )
        },
        rolls() {
            return this.rollResult ? this.rollResult.rolls : []
        },
        total() {
            return this.rollResult ? this.rollResult.total : 0
        },
    },
    watch: {
        dice(newDice, oldDice) {
            if (this.min !== newDice.min) {
                this.min = newDice.min
            }
            if (this.max !== newDice.max) {
                this.max = newDice.max
            }
            if (this.diceType !== newDice.diceType) {
                this.diceType = newDice.diceType
            }
        },
    },
    methods: {
        onRollBtnClick() {
            this.rollResult = rulesEngine.diceUtil.rollDice(
                this.count ? this.count : 1,
                this.dice,
                this.modifier
            )
        },
    },
}
</script>

<style>
.short-number-input {
    max-width: 50px;
    margin: 2px;
}
.dice-type-select {
    max-width: 60px;
    margin: 2px;
}
.roll-btn {
    margin-left: 5px;
}
.total-text input {
    text-align: right;
}
</style>
