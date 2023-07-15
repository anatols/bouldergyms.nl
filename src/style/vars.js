const styleVars = {
  "--primary-font-family": "Pontano Sans, sans-serif",
  "--primary-text-color": "#444",

  "--primary-link-color": "#18314f",
  "--primary-background-color": "#fefefe",
  "--active-link-color": "#007c70",
};

export default {
  ...styleVars,

  mixin: {
    created() {
      this.styleVars = styleVars;
    },
  },
};
