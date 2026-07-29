# bouldergyms.nl

This repo holds frontend source code for [bouldergyms.nl](https://bouldergyms.nl), a website with nice charts for visual comparison of bouldering gym grades.

Ascends data comes from [TopLogger](http://toplogger.nu).

This website was previously a part of my other project, bouldest.nl. However, I have transferred bouldest.nl to another bouldering enthusiast in July 2023, and moved this site to [bouldergyms.nl](https://bouldergyms.nl).

The project is a Vue.js app written in Javascript. It was started in mid 2020 on Vue 2 with the Options API, Vuex and Vue CLI, and was modernized in 2026: it now runs on Vue 3 with the Composition API (`<script setup>`), Pinia for state and Vite as the build tool.

This repository misses history backing to the very beginning. This is on purpose, so that I could make it open source. The original repo where this project was maintained had the data collector part. I prefer not to publish that part to avoid exposing TopLogger's private APIs.

## Project setup
Requires Node.js, see required version in `.nvmrc`.

```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Serves the production build locally
```
npm run preview
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See the [Vite configuration reference](https://vite.dev/config/).
