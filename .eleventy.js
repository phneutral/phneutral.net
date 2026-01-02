//const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const schema = require("@quasibit/eleventy-plugin-schema");
const footnote_plugin = require('markdown-it-footnote');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(schema);


  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  // New in RSS 1.2.0
	eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);;

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })
  eleventyConfig.addFilter('iso8601', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO()
  })
  eleventyConfig.addFilter("isItemInCollection", function(collection, url) {
    return collection.some(item => item.url === url);
  });
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(footnote_plugin));


  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
	// 	// output image formats
	// 	formats: ["webp"],
  //
	// 	// output image widths
	// 	widths: ["auto"],
  //
	// 	// optional, attributes assigned on <img> nodes override these values
	// 	htmlOptions: {
	// 		imgAttributes: {
	// 			loading: "lazy",
	// 			decoding: "async",
	// 		},
	// 		pictureAttributes: {}
	// 	},
	// });

  eleventyConfig.addPassthroughCopy("./sources/keybase.txt");
  eleventyConfig.addPassthroughCopy("./sources/static/meta");
  eleventyConfig.addPassthroughCopy("./sources/static/images/phneutral_logo_pixel.png");
  eleventyConfig.addPassthroughCopy("./sources/static/webfonts");
  eleventyConfig.addWatchTarget("./deploy/static/css/style.css");
  eleventyConfig.addWatchTarget("./deploy/static/css/style.min.css");
  eleventyConfig.addWatchTarget("./deploy/static/shoelace/index.js");
  eleventyConfig.addWatchTarget("./deploy/static/shoelace/index.min.js");

  return {
    dataTemplateEngine: "njk",

    dir: {
      input: 'sources',
      output: 'deploy',
      data: '_data',
    },
  };
};
