module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./sources/static/webfonts");
  eleventyConfig.addWatchTarget("./deploy/static/css/style.css");
  eleventyConfig.addWatchTarget("./deploy/static/css/style.min.css");
  eleventyConfig.addWatchTarget("./deploy/static/shoelace/index.js");
  eleventyConfig.addWatchTarget("./deploy/static/shoelace/index.min.js");
  return {
    dir: {
      input: 'sources',
      output: 'deploy',
    },
  };
};
