import { ASC, DESC, compareValueArrays } from "./comparator";

function sortedBy(array, callbackFn, defaultOperation = ASC) {
  return [...array].sort((itemA, itemB) => {
    const valuesA = callbackFn(itemA);
    const valuesB = callbackFn(itemB);

    return compareValueArrays(valuesA, valuesB, defaultOperation);
  });
}

sortedBy.ASC = ASC;
sortedBy.DESC = DESC;

export default sortedBy;
