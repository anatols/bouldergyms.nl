<template>
  <div class="gym-list">
    <div class="hide-all">
      <a class="pseudo-link" href="" v-on:click.prevent="onHideAllClicked"
        >Uncheck all</a
      >
    </div>
    <div class="gyms-container">
      <div
        class="gym-bucket"
        v-for="(gymBucket, gymBucketIndex) in gymBucketsRanked"
        :key="gymBucket.city"
        :style="{
          gridRow: 'span ' + (gymBucket.gyms.length + 1),
          backgroundColor: gymBucketColor[gymBucketIndex] }"
      >
        <div class="gym-city">
          <a
            class="pseudo-link"
            href=""
            v-on:click.prevent="onToggleBucket(gymBucket)"
            >{{ gymBucket.country_code === "NL" ? "" : gymBucket.country_code + " - " }}{{ gymBucket.city }}</a
          >
        </div>
        <div v-for="gym in gymBucket.gyms" :key="gym.id">
          <CustomCheckbox
            :checked="gymExtraData[gym.id].enabled"
            :color="gym.chart_color"
            v-on:change="settings.setGymEnabled(gym.id, $event)"
            >{{ gymExtraData[gym.id].listName }}
          </CustomCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import CustomCheckbox from "@/components/CustomCheckbox.vue";
import { gymBucketsRanked, gymsRanked } from "@/stats/gyms";
import { useSettingsStore } from "@/stores/settings";

// Alternating background shades, changing every time the country changes.
const gymBucketColor = (() => {
  const colors = [
    "var(--primary-background-color)",
    "#efefef",
    "#efefe7",
    "#e7e7ef",
  ];
  let lastCountryCode = gymBucketsRanked[0].country_code;
  let colorIndex = 0;

  return gymBucketsRanked.map((bucket) => {
    if (bucket.country_code != lastCountryCode) {
      lastCountryCode = bucket.country_code;
      colorIndex = (colorIndex + 1) % colors.length;
    }
    return colors[colorIndex];
  });
})();

const settings = useSettingsStore();
const { enabledGymIds } = storeToRefs(settings);

const gymExtraData = computed(() =>
  Object.fromEntries(
    gymsRanked.map((gym) => [
      gym.id,
      {
        enabled: enabledGymIds.value.includes(gym.id),
        listName: gym.name
          .replace(" " + gym.city, "")
          .replace(gym.city + " ", ""),
      },
    ])
  )
);

function onHideAllClicked() {
  [...enabledGymIds.value].forEach((id) => settings.setGymEnabled(id, false));
}

function onToggleBucket(gymBucket) {
  const allEnabled = gymBucket.gyms.every(
    (gym) => gymExtraData.value[gym.id].enabled
  );
  gymBucket.gyms.forEach((gym) =>
    settings.setGymEnabled(gym.id, !allEnabled)
  );
}
</script>

<style scoped>
.gym-list {
  text-align: center;
}

.hide-all {
  margin-bottom: 10px;
}

.gyms-container {
  width: 350px;
  display: grid;
  grid-template-rows: repeat(auto-fill, auto);
  grid-template-columns: repeat(2, auto);
  column-gap: 1rem;
}

.gym-bucket {
  padding: 3px 10px 5px 10px;
  margin: 3px;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  text-align: left;
}

.gym-city {
  font-size: 10px;
  /* border-bottom: 1px solid #eee; */
  padding-bottom: 2px;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 480px) {
  .gyms-container {
    grid-template-columns: repeat(2, auto);
  }
}

@media screen and (min-width: 481px) and (max-width: 800px) {
  .gyms-container {
    grid-template-columns: repeat(3, auto);
    width: 85vw;
  }
}

@media screen and (min-width: 801px) and (max-width: 1150px) {
  .gyms-container {
    grid-template-columns: repeat(5, auto);
    width: 100%;
  }
}
</style>
