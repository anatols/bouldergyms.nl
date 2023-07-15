# bouldergyms.nl

This repo holds frontend source code for [bouldergyms.nl](https://bouldergyms.nl), a website with nice charts for visual comparison of bouldering gym grades.

Ascends data comes from [TopLogger](http://toplogger.nu).

This website was previously a part of my other project, bouldest.nl. However, I have transferred bouldest.nl to another bouldering enthusiast in July 2023, and moved this site to [bouldergyms.nl](https://bouldergyms.nl).

The project is a Vue.js app, using Vue.js Options API and Javascript as the implementation language. This deemed a reasonable choice of technologies when the project was started (mid 2020). Although it's quite outdated as of 2023, I'm following a "not broken - not fixed" ideology here. Whilst I'm adding minor fixes and features now and then, I'm not planning any major updates.

This repository misses history backing to the very beginning. This is on purpose, so that I could make it open source. The original repo where this project was maintained had the data collector part. I prefer not to publish that part to avoid exposing TopLogger's private APIs.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
