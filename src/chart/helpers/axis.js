import grades from "@/stats/grades";

function forPercentages(showAxisPointer) {
  return {
    type: "value",
    interval: 10,
    axisLabel: {
      formatter: "{value}%",
    },
    axisPointer: {
      show: showAxisPointer,
      triggerTooltip: false,
      type: "line",
      label: {
        show: false,
      },
    },
  };
}

function forGradeScale(gradeScale, showAxisPointer = true, name = "") {
  return {
    name,
    nameLocation: "middle",
    nameGap: 25,
    type: "category",
    data: grades.gradeNames(gradeScale),
    position: "bottom",
    splitLine: {
      show: true,
    },
    axisPointer: {
      show: showAxisPointer,
      type: "shadow",
      label: {
        show: true,
      },
    },
  };
}

function forMajorGradeScale(gradeScale) {
  return {
    type: "category",
    data: gradeScale.map(([, gradeName]) => gradeName),
    position: "top",
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#000000", "#000000"],
      },
    },
    z: 1,
  };
}

function forGradeComparison(name) {
  return {
    type: "value",
    name,
    nameLocation: "middle",
    nameGap: 25,
    min: -134,
    max: 134,
    inverse: true,
    interval: 33,
    show: true,
    axisLabel: {
      formatter: (value) => {
        const sign = value < 0 ? "-" : "+";
        const absValue = Math.abs(value);

        if (absValue > 110) {
          return sign + "1 \u2153";
        } else if (absValue > 70) {
          return sign + "1";
        } else if (absValue > 50) {
          return sign + "\u2154";
        } else if (absValue > 20) {
          return sign + "\u2153";
        }

        return "=";
      },
    },
  };
}

export default {
  forPercentages,
  forGradeScale,
  forMajorGradeScale,
  forGradeComparison,
};
