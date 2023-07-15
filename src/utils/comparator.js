function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

function genericComparatorAsc(valueA, valueB) {
  if (valueA < valueB) {
    return -1;
  } else if (valueA > valueB) {
    return 1;
  }
  return 0;
}

function genericComparatorDesc(valueA, valueB) {
  return -genericComparatorAsc(valueA, valueB);
}

export const ASC = "asc";
export const DESC = "desc";

function comparatorForOperation(operation) {
  if (operation === DESC) {
    return genericComparatorDesc;
  } else if (operation === ASC) {
    return genericComparatorAsc;
  } else if (isFunction(operation)) {
    return operation;
  } else {
    throw "Invalid comparison operation.";
  }
}

export function compareValueArrays(valuesA, valuesB, defaultOperation = ASC) {
  const defaultComparator = comparatorForOperation(defaultOperation);

  if (!Array.isArray(valuesA) && !Array.isArray(valuesB)) {
    return defaultComparator(valuesA, valuesB);
  }

  if (valuesA.length != valuesB.length) {
    throw "Callback function must always return the same number of values.";
  }

  for (let i = 0; i < valuesA.length; i++) {
    let valueA = valuesA[i];
    let valueB = valuesB[i];
    let comparator = defaultComparator;

    if (
      Array.isArray(valueA) &&
      valueA.length === 2 &&
      Array.isArray(valueB) &&
      valueB.length === 2 &&
      valueA[1] === valueB[1]
    ) {
      comparator = comparatorForOperation(valueA[1]);
      valueA = valueA[0];
      valueB = valueB[0];
    }

    const comparisonResult = comparator(valueA, valueB);
    if (comparisonResult != 0) {
      return comparisonResult;
    }
  }

  return 0;
}
