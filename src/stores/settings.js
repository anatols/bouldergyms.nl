import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { gymBucketsRanked, gymsRanked } from "@/stats/gyms";

const STORAGE_KEY = "settings_2";

export const useSettingsStore = defineStore("settings", () => {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const enabledGymIds = ref(
    stored?.enabledGymIds ??
      gymBucketsRanked[0].gyms.slice(0, 2).map((gym) => gym.id),
  );
  const myGymId = ref(stored?.myGymId ?? gymBucketsRanked[0].gyms[0].id);

  watch(
    [enabledGymIds, myGymId],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          enabledGymIds: enabledGymIds.value,
          myGymId: myGymId.value,
        }),
      );
    },
    { immediate: true },
  );

  function setGymEnabled(id, enabled) {
    const ids = new Set(enabledGymIds.value);
    if (enabled) {
      ids.add(id);
    } else {
      ids.delete(id);
    }
    enabledGymIds.value = [...ids];

    // Keep "my gym" pointing at a gym that is actually on the chart.
    if (
      !enabledGymIds.value.includes(myGymId.value) &&
      enabledGymIds.value.length > 0
    ) {
      myGymId.value = gymsRanked.find(({ id }) =>
        enabledGymIds.value.includes(id),
      )?.id;
    }
  }

  function setMyGymId(id) {
    myGymId.value = id;
  }

  return { enabledGymIds, myGymId, setGymEnabled, setMyGymId };
});
