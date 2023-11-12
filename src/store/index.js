import Vue from "vue";
import Vuex from "vuex";

import stats from "@/stats/stats";
import { sortedBy, take } from "@/utils";

Vue.use(Vuex);

function saveSettingsToLocalStore(settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
}

function loadInitialState() {
  const citySanitizingRegex = /[^a-z]/gi;

  const gymBucketsRanked = take(Object.values(stats.gyms))
    .bucketedBy(
      (gym) => gym.city.replace(citySanitizingRegex, ""),
      (cityA, cityB) => cityA.localeCompare(cityB)
    )
    .sortedBy((bucket) => bucket.length, sortedBy.DESC)
    .sortedBy(
      (bucket) =>
        bucket[0].country_code === "NL" ? "" : bucket[0].country_code,
      sortedBy.ASC
    )
    .map((bucket) => ({
      city: bucket[0].city,
      country_code: bucket[0].country_code,
      gyms: take(bucket)
        .sortedBy(({ stats }) => stats.nr_ascends, sortedBy.DESC)
        .toArray(),
    }));

  const gymsRanked = gymBucketsRanked.reduce(
    (gyms, bucket) => (gyms.push(...bucket.gyms), gyms),
    []
  );

  let settings = JSON.parse(localStorage.getItem("settings"));
  if (settings === null) {
    settings = {
      enabledGymIds: gymBucketsRanked[0].gyms.map((gym) => gym.id).slice(0, 2),
      myGymId: gymBucketsRanked[0].gyms[0].id,
    };

    saveSettingsToLocalStore(settings);
  }

  return {
    stats,
    gymsRanked,
    gymBucketsRanked,
    settings,
  };
}

export default new Vuex.Store({
  state: loadInitialState(),
  mutations: {
    setGymEnabled(state, { id, enabled }) {
      const stateSet = new Set(state.settings.enabledGymIds);
      if (enabled) {
        stateSet.add(id);
      } else {
        stateSet.delete(id);
      }
      state.settings.enabledGymIds = [...stateSet];

      if (
        !state.settings.enabledGymIds.includes(state.settings.myGymId) &&
        state.settings.enabledGymIds.length > 0
      ) {
        state.settings.myGymId = state.gymsRanked.filter(({ id }) =>
          state.settings.enabledGymIds.includes(id)
        )[0]?.id;
      }

      saveSettingsToLocalStore(state.settings);
    },
    setMyGymId(state, myGymId) {
      state.settings.myGymId = myGymId;
      saveSettingsToLocalStore(state.settings);
    },
  },
});
