const postCss = require('postcss');
const loadConfig = require('postcss-load-config'); // <-- NEU: Paket zum Laden der Konfiguration
const enableBuild = process.env.mode === 'build'

const postcssFilter = (cssCode, done) => {
  // 1. Lade die Konfiguration (Plugins und Optionen) asynchron aus .postcssrc.js
  loadConfig({})
    .then(({ plugins, options }) => {

      // 2. Rufe postCss mit den geladenen Plugins auf
      return postCss(plugins)
        .process(cssCode, {
          ...options, // Optionen wie z.B. Sourcemaps
          from: './sources/css/style.css' // Bleibt bestehen oder wird von options überschrieben
        });
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
    )
    .catch((err) => {
      // Fehler beim Laden der Konfiguration behandeln
      done(err, null);
    });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./deploy/static/css/style.css");
  eleventyConfig.addWatchTarget("./deploy/static/js/shoelace.js");
  eleventyConfig.addPassthroughCopy('sources/images');
  eleventyConfig.addPassthroughCopy('sources/svgs');
  eleventyConfig.addPassthroughCopy('sources/shoelace');
  eleventyConfig.addWatchTarget('sources/css');
  eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);
  return {
    dir: {
      input: 'sources',
      output: 'deploy',
    },
  };
};
