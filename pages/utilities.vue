<!--- utilities.vue --->

<template>
  <v-row>
    <v-col>
      <v-card><dice-roller></dice-roller></v-card>
    </v-col>
    <v-col></v-col>
    <v-col></v-col>
  </v-row>
</template>

<script>
import diceRoller from '~/components/utilities/diceRoller'
import rulesEngine from '~/assets/js/rulesEngine/rulesEngine'
export default {
  components: {
    diceRoller,
  },
  data() {
    return {
      rolls: rulesEngine.diceUtil.rollDice(5, 1, 8, 2),
    }
  },
}
</script>
