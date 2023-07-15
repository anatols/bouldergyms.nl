<template>
  <div class="chart-legend">
    <div class="gym-list">
      <div class="gym" v-for="gym in gymsToDisplay" :key="gym.id">
        <CustomCheckbox
          :checked="gym.id === myGymId"
          :color="gym.chart_color"
          :type="enableMyGymSelection ? 'radio' : 'marker'"
          v-on:change="setMyGymId(gym.id)"
          >{{ gym.name }}</CustomCheckbox
        >
      </div>
    </div>
    <div
      v-if="enableMyGymSelection && gymsToDisplay.length <= 1"
      class="not-enough-gyms-selected-warning"
    >
      Please select at least two gyms.
    </div>
    <div
      v-else-if="gymsToDisplay.length === 0"
      class="not-enough-gyms-selected-warning"
    >
      Please select at least one gym.
    </div>
    <div v-else-if="enableMyGymSelection" class="chart-tip">Select <i>your</i> gym above and click the chart or hover mouse over it for more info.</div>
    <div v-else class="chart-tip">Click the chart or hover mouse over it for more info.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

import CustomCheckbox from "@/components/CustomCheckbox.vue";

export default {
  name: "ChartSettings",
  props: ["enable-my-gym-selection"],
  components: {
    CustomCheckbox,
  },
  methods: {
    ...mapMutations(["setMyGymId"]),
  },
  computed: {
    ...mapState({
      enabledGymIds: (state) => state.settings.enabledGymIds,
      gymsRanked: (state) => state.gymsRanked,
      myGymId: (state) => state.settings.myGymId,
    }),
    gymsToDisplay() {
      return this.gymsRanked.filter(({ id }) =>
        this.enabledGymIds.includes(id)
      );
    },
  },
};
</script>

<style scoped>
.chart-legend {
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.not-enough-gyms-selected-warning {
  font-weight: bold;
  margin: 10px;
}

.chart-tip {
  margin: 10px;
}

.gym-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gym {
  display: inline-block;
  white-space: nowrap;
  margin: 3px;
  margin-left: 7px;
}
</style>
