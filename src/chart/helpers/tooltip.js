function forPercentileChart() {
  return {
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: (params) => {
        if (Array.isArray(params)) {
          return (
            `<b>${params[0].value[0]}</b> can be climbed by<br/>` +
            params
              .sort((paramA, paramB) => paramB.value[1] - paramA.value[1])
              .map(
                (param) =>
                  `${param.marker}${param.value[1]}% at ${param.seriesName}`
              )
              .join("<br/>")
          );
        } else {
          return (
            `<b>${params.value[0]}</b> can be climbed by<br/>` +
            `${params.marker}${params.value[1]}% at ${params.seriesName}`
          );
        }
      },
    },
  };
}

function forPopularityChart() {
  return {
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: (params) => {
        if (Array.isArray(params)) {
          return (
            `Grade <b>${params[0].value[0]}</b> was climbed in<br/>` +
            params
              .sort((paramA, paramB) => paramB.value[1] - paramA.value[1])
              .map(
                (param) =>
                  `${param.marker}${param.value[1]}% cases at ${param.seriesName}`
              )
              .join("<br/>")
          );
        } else {
          return (
            `Grade <b>${params.value[0]}</b> was climbed in<br/>` +
            `${params.marker}${params.value[1]}% cases at ${params.seriesName}`
          );
        }
      },
    },
  };
}

function forGradeComparisonChart(myGymId) {
  return {
    tooltip: {
      trigger: "axis",
      confine: true,
      formatter: (params) => {
        const myGymParam = params.find((param) => param.seriesId == myGymId);
        const myGymGradeName = myGymParam.value[0];

        const otherGymParams = params.filter(
          (param) => param.seriesId != myGymId
        );

        if (otherGymParams.length === 0) {
          return (
            `${myGymParam.marker}<b>${myGymGradeName}</b> at ${myGymParam.seriesName}<br/>` +
            `No matching grades at other gyms.`
          );
        }

        return (
          `If you can climb<br/>${myGymParam.marker}<b>${myGymGradeName}</b> at ${myGymParam.seriesName}<br/>` +
          `you should be able to climb<br/>` +
          otherGymParams
            .map((param) => {
              const otherGymGradeNameRange = param.value[2].join(" &ndash; ");
              return `${param.marker}<b>${otherGymGradeNameRange}</b> at ${param.seriesName}`;
            })
            .join("<br/>")
        );
      },
    },
  };
}

export default {
  forPercentileChart,
  forPopularityChart,
  forGradeComparisonChart,
};
