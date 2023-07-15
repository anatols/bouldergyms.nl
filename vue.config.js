module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/stats/" : "/",
  pages: {
    index: {
      entry: "src/main.js",
      title: "Bouldering Gym Stats",
    },
  },
};
