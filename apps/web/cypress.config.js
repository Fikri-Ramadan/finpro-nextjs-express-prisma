const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: '**/*.{spec,test}.{js,ts,jsx,tsx}',
  },
});
