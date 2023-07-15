<template>
  <div id="app" :style="styleVars">
    <div class="content">
      <div id="nav">
        <router-link :to="chartTypes.COMPARISON">Comparison</router-link>
        |
        <router-link :to="chartTypes.PERCENTILES">Strength</router-link>
        |
        <router-link :to="chartTypes.POPULARITY">Popularity</router-link>
        |
        <router-link to="/about">About the data</router-link>
      </div>
      <router-view />
    </div>
    <footer>
      Developed by Anatoliy "Tony" Samara,
      <a href="mailto:tony@bouldergyms.nl">tony@bouldergyms.nl</a>. Gym &amp; ascends
      data provided by
      <a href="https://toplogger.nu/" target="_blank">TopLogger</a>.
    </footer>
  </div>
</template>

<script>
import chartTypes from "@/chart/chart-types";
import styleVars from "@/style/vars";

export default {
  mixins: [chartTypes.mixin, styleVars.mixin],
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald&family=Pontano+Sans&display=swap");

html body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: var(--primary-font-family);
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary-text-color);
  background-color: var(--primary-background-color);
}

#nav {
  padding: 10px;
  padding-bottom: 10px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  white-space: nowrap;
}

#nav a.router-link-exact-active {
  color: var(--active-link-color);
}

h1 {
  font-family: "Oswald", sans-serif;
  text-align: center;
  font-size: 24px;
}

a {
  color: var(--primary-link-color);
}

.pseudo-link {
  border-bottom: dotted 1px var(--primary-link-color);
  text-decoration: none;
  font-size: 12px;
}

.content {
  min-height: calc(100vh - 60px);
}

footer {
  padding: 20px;
  padding-bottom: 5px;
  text-align: center;
  opacity: 0.5;
}
</style>
