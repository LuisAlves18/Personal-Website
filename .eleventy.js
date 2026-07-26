module.exports = function (eleventyConfig) {
  // Ficheiros estáticos passados diretamente para o output
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Coleção do blog, com filtro por idioma
  eleventyConfig.addCollection("blogPt", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/blog/**/*_pt.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("blogEn", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/blog/**/*_en.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    pathPrefix: "/Personal-Website/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
