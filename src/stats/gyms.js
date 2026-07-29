import stats from "@/stats/stats.json";
import { sortedBy, take } from "@/utils";

const citySanitizingRegex = /[^a-z]/gi;

// Gyms grouped by city. Cities are ordered by how many gyms they have, with
// Dutch cities first; gyms within a city by how many ascends were logged there.
export const gymBucketsRanked = take(Object.values(stats.gyms))
  .bucketedBy(
    (gym) => gym.city.replace(citySanitizingRegex, ""),
    (cityA, cityB) => cityA.localeCompare(cityB)
  )
  .sortedBy((bucket) => bucket.length, sortedBy.DESC)
  .sortedBy(
    (bucket) => (bucket[0].country_code === "NL" ? "" : bucket[0].country_code),
    sortedBy.ASC
  )
  .map((bucket) => ({
    city: bucket[0].city,
    country_code: bucket[0].country_code,
    gyms: take(bucket)
      .sortedBy(({ stats }) => stats.nr_ascends, sortedBy.DESC)
      .toArray(),
  }))
  .toArray();

// The same gyms, flattened, keeping the ranked order.
export const gymsRanked = gymBucketsRanked.flatMap((bucket) => bucket.gyms);
