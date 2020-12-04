<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title class="card-title-tight"
                    >Dice Roller</v-card-title
                >
                <v-card-subtitle>{{ diceRequestDisplay }}</v-card-subtitle>
                <v-card-actions>
                    <v-text-field
                        v-model="count"
                        label="Count"
                        type="number"
                        min="1"
                        class="short-number-input"
                    ></v-text-field>
                    <v-select
                        v-model="diceType"
                        label="Type"
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
                    <v-btn class="roll-btn" @click="onRollBtnClick">Roll</v-btn>
                </v-card-actions>
                <v-card-text>{{ rollResult }}</v-card-text>
            </v-card>
        </v-col>
    </v-row>
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
.card-title-tight {
    padding: 5px;
}
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
</style>
