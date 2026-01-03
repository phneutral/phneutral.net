const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const schema = require("@quasibit/eleventy-plugin-schema");
const footnote_plugin = require('markdown-it-footnote');

module.exports = function (eleventyConfig) {
  // RSS related
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
	eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);

  // JSON-LD schema.org
  eleventyConfig.addPlugin(schema);
  eleventyConfig.addFilter('iso8601', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO()
  })

  // Convert to 11ty date format
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  // Add footnote handling to md templates
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(footnote_plugin));

  // Check if a url is part of a collection
  eleventyConfig.addFilter("isItemInCollection", function(collection, url) {
    return collection.some(item => item.url === url);
  });

  // Handle images
  const slugify = eleventyConfig.getFilter("slugify");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["webp"],

		// output image widths
		widths: ["auto"],

    // keep gif animations
    sharpOptions: {
        animated: true,
      },

    // optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},

    filenameFormat: (id, src, width, format) => {
     const { name } = path.parse(src);
     const cleanName = slugify(name);

     return `${cleanName}-${width}w.${format}`;
    },
	});

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
