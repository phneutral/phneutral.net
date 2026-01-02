module.exports = {
  type: "page",
  meta: {
    language: "de-DE"
  },
  eleventyComputed: {
    schema: {
      name: data => data.metadata.title,
      title: data => data.metadata.title,
      description: data => data.description || data.metadata.description,
      url: data => data.metadata.url,
      image: data => data.metadata.image ? `${data.metadata.url}${data.metadata.image}` : null
    },
    metaTitle: data => data.title || data.metadata.title
  }
};
