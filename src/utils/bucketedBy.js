import { ASC, DESC, compareValueArrays } from "./comparator";
import sortedBy from "./sortedBy";

function bucketedBy(array, callbackFn, defaultOperation = ASC) {
  return sortedBy(array, callbackFn, defaultOperation).reduce(
    (buckets, item) => {
      if (
        buckets.length === 0 ||
        compareValueArrays(
          callbackFn(buckets[buckets.length - 1][0]),
          callbackFn(item),
          defaultOperation
        ) !== 0
      ) {
        buckets.push([item]);
      } else {
        buckets[buckets.length - 1].push(item);
      }
      return buckets;
    },
    []
  );
}

bucketedBy.ASC = ASC;
bucketedBy.DESC = DESC;

export default bucketedBy;
