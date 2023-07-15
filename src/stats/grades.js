import Piecewise from "piecewise-function";
import { take, sortedBy } from "@/utils";

function findGradeIndex(numericGrade, gradeScale) {
  const epsilon = 0.02;
  for (let gradeIndex = gradeScale.length - 1; gradeIndex >= 0; gradeIndex--) {
    if (numericGrade >= gradeScale[gradeIndex][0] - epsilon) {
      return gradeIndex;
    }
  }
  return 0;
}

function findGrade(numericGrade, gradeScale) {
  return gradeScale[findGradeIndex(numericGrade, gradeScale)];
}

function reduceToScale(gradeValuePairs, gradeScale, initialValue, reducerFn) {
  return sortedBy(
    Object.values(
      gradeValuePairs.reduce((accumulator, [grade, value]) => {
        const [scaleGrade, gradeName] = findGrade(grade, gradeScale);

        if (!(scaleGrade in accumulator)) {
          accumulator[scaleGrade] = {
            grade: scaleGrade,
            gradeName,
            value: initialValue,
          };
        }

        accumulator[scaleGrade].value = reducerFn(
          accumulator[scaleGrade].value,
          value
        );

        return accumulator;
      }, {})
    ),
    (accum) => accum.grade
  );
}

function reducePercentilesToScale(gradeValuePairs, gradeScale) {
  return reduceToScale(
    gradeValuePairs,
    gradeScale,
    0,
    (lastValue, currentValue) => Math.max(lastValue, currentValue)
  );
}

function reducePopularitiesToScale(gradeValuePairs, gradeScale) {
  return reduceToScale(
    gradeValuePairs,
    gradeScale,
    0,
    (sum, currentValue) => sum + currentValue
  );
}

function mapGradeNamesToValues(reducedValues, valueFn) {
  return reducedValues.map((reduced) => [
    reduced.gradeName,
    valueFn(reduced.value),
  ]);
}

function gradeNames(gradeScale) {
  return gradeScale.map(([, gradeName]) => gradeName);
}

function findOverlappingScaleRange(
  gradeValuePairsA,
  gradeValuePairsB,
  gradeScale
) {
  const minGradeIndex = Math.max(
    findGradeIndex(gradeValuePairsA[0][0], gradeScale),
    findGradeIndex(gradeValuePairsB[0][0], gradeScale)
  );

  const maxGradeIndex = Math.min(
    findGradeIndex(
      gradeValuePairsA[gradeValuePairsA.length - 1][0],
      gradeScale
    ),
    findGradeIndex(gradeValuePairsB[gradeValuePairsB.length - 1][0], gradeScale)
  );

  return gradeScale.slice(minGradeIndex, maxGradeIndex + 1);
}

function PercentileMapper(baseGradePercentilePairs, baseGradeScale) {
  const reducedBasePercentiles = reducePercentilesToScale(
    baseGradePercentilePairs,
    baseGradeScale
  );

  const baseGradeToPercentilePW = Piecewise(
    reducedBasePercentiles.map(({ grade }) => grade),
    reducedBasePercentiles.map(({ value }) => value)
  );

  this.mapPercentiles = function(targetGradePercentilePairs, targetGradeScale) {
    const overlappingScaleRange = findOverlappingScaleRange(
      baseGradePercentilePairs,
      targetGradePercentilePairs,
      baseGradeScale
    );

    // If we're mapping from gym to itself we want a nice straight line,
    // so let's just output one to one mapping for each grade
    if (baseGradePercentilePairs === targetGradePercentilePairs) {
      return targetGradeScale.map(([grade, gradeName]) => ({
        baseGrade: grade,
        baseGradeName: gradeName,
        targetGrade: grade,
      }));
    }

    const reducedTargetPercentiles = reducePercentilesToScale(
      targetGradePercentilePairs,
      baseGradeScale
    );
    const targetGradeToPercentilePW = Piecewise(
      reducedTargetPercentiles.map(({ grade }) => grade),
      reducedTargetPercentiles.map(({ value }) => value)
    );

    // Percentiles are meaningful for scale ranges of each gym separately.
    // The lowest grade present _in that gym_ will have 100%, the highest 0%.
    // Since overlapping scale range in general does not coincide with scale
    // ranges of both gyms (that's why it's present in the first place),
    // we can't directly compare percentiles between gyms.
    // We need to re-scale percentiles to the overlapping range of grades
    // (so that for both gyms percentile is 100% at the lowest common grade,
    // and at 0% at the highest)

    const minOverlappingGrade = overlappingScaleRange[0][0];
    const maxOverlappingGrade =
      overlappingScaleRange[overlappingScaleRange.length - 1][0];

    const minBasePercentile = baseGradeToPercentilePW(maxOverlappingGrade);
    const maxBasePercentile = baseGradeToPercentilePW(minOverlappingGrade);

    const minTargetPercentile = targetGradeToPercentilePW(maxOverlappingGrade);
    const maxTargetPercentile = targetGradeToPercentilePW(minOverlappingGrade);

    // Build a reverse piece-wise function to lookup grade by percentile value.
    const reducedTargetPercentilesSortedByValue = take(reducedTargetPercentiles)
      .sortedBy(({ value }) => value)
      .toArray();
    const targetPercentileToGradePW = Piecewise(
      reducedTargetPercentilesSortedByValue.map(
        ({ value }) =>
          (value - minTargetPercentile) /
          (maxTargetPercentile - minTargetPercentile)
      ),
      reducedTargetPercentilesSortedByValue.map(({ grade }) => grade)
    );

    return overlappingScaleRange.map(([baseGrade, baseGradeName]) => {
      const basePercentile = Math.max(
        (baseGradeToPercentilePW(baseGrade) - minBasePercentile) /
          (maxBasePercentile - minBasePercentile),
        0
      );

      const targetGrade = targetPercentileToGradePW(basePercentile);

      // Let's determine if we have an exact match, or if it's a grade
      // in between scale steps.
      // note: findGradeIndex rounds down.
      let targetGradeIndex = findGradeIndex(targetGrade, targetGradeScale);
      let targetGradeNames = [];
      const epsilon = 0.05;
      if (
        Math.abs(targetGradeScale[targetGradeIndex][0] - targetGrade) <
          epsilon ||
        targetGradeIndex >= targetGradeScale.length - 1
      ) {
        targetGradeNames = [targetGradeScale[targetGradeIndex][1]];
      } else {
        targetGradeNames = [
          targetGradeScale[targetGradeIndex][1],
          targetGradeScale[targetGradeIndex + 1][1],
        ];
      }

      return {
        baseGrade,
        baseGradeName,
        targetGrade,
        targetGradeNames,
      };
    });
  };
}

export default {
  findGrade,
  reducePercentilesToScale,
  reducePopularitiesToScale,
  mapGradeNamesToValues,
  gradeNames,
  overlappingScaleRange: findOverlappingScaleRange,
  PercentileMapper,
};
