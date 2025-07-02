new Crawler({
  appId: "FMY8D84KMI",
  indexPrefix: "_test_",
  rateLimit: 8,
  maxUrls: 30,
  schedule: "on the first day of the month",
  startUrls: [],
  sitemaps: ["https://docs.hazelcast.com/sitemap.xml"],
  saveBackup: false,
  ignoreQueryParams: [],
  actions: [
    {
      indexName: "algolia_crawler_articles_for_instant_search",
      pathsToMatch: [
        "https://docs.hazelcast.com/management-center/5.8/getting-started/**",
      ],
      recordExtractor: ({ url, $ }) => {
        const RECORD_TYPE = {
          TITLE: 0,
          CONTENT: 1,
          DESCRIPTION: 2,
          SECTION_TITLE: 3,
          SUBSECTION_TITLE: 4,
          OPENAPI: 5,
        };
        const isImdg = /\/imdg\//.test(url.pathname);
        const title = $(".doc  h1").text().trim();
        const version = $("#navbarProductVersion").text().trim();
        const product = $("#navbarProductName").text().trim();
        const records = [];

        const recordBase = {
          title: title,
          version: version,
          product: product,
          pageRank: isImdg ? "-1000" : "0",
        };

        // main title
        records.push({
          ...recordBase,
          type: RECORD_TYPE.TITLE,
          url: url,
        });

        // description, aka #preamble
        records.push({
          ...recordBase,
          type: RECORD_TYPE.DESCRIPTION,
          content: $("#preamble").text().trim(),
          url: url,
        });

        $(".sect1").each((_i, sectionEl) => {
          const sectionTitle = $(sectionEl).find("h2").text().trim();
          const sectionAnchor = $(sectionEl).find("h2>a.anchor").attr("href");
          // section title
          records.push({
            ...recordBase,
            type: RECORD_TYPE.SECTION_TITLE,
            section: sectionTitle,
            url: `${url}${sectionAnchor}`,
          });
          // add immediate paragraphs
          $(sectionEl)
            .find(".sectionbody>.paragraph")
            .each((_i, contentEl) => {
              const content = $(contentEl).text().trim();
              // filter out 'empty' elements like images
              if (content) {
                records.push({
                  ...recordBase,
                  section: sectionTitle,
                  subsection: "subsection", // .sect2
                  type: RECORD_TYPE.CONTENT,
                  content: content,
                  url: `${url}${sectionAnchor}`,
                });
              }
            });

          // add paragraphs from subsections
          $(sectionEl)
            .find(".sect2")
            .each((_i, subsectionEl) => {
              const subsectionTitle = $(subsectionEl).find("h3").text().trim();
              const subsectionAnchor = $(subsectionEl)
                .find("h3>a.anchor")
                .attr("href");
              // subsection title
              records.push({
                ...recordBase,
                type: RECORD_TYPE.SUBSECTION_TITLE,
                section: sectionTitle,
                subsection: subsectionTitle,
                url: `${url}${subsectionAnchor}`,
              });
              // add immediate paragraphs
              $(subsectionEl)
                .find(".paragraph")
                .each((_i, contentEl) => {
                  const content = $(contentEl).text().trim();
                  // filter out 'empty' elements like images
                  if (content) {
                    records.push({
                      ...recordBase,
                      section: sectionTitle,
                      subsection: subsectionTitle,
                      type: RECORD_TYPE.CONTENT,
                      content: content,
                      url: `${url}${subsectionAnchor}`,
                    });
                  }
                });
            });
        });

        return records;
      },
    },
  ],
  initialIndexSettings: {
    algolia_crawler_articles_for_instant_search: {
      distinct: true,
      attributeForDistinct: "url",
      searchableAttributes: ["unordered(title)", "unordered(content)", "url"],
      customRanking: ["asc(depth)"],
      attributesForFaceting: ["product", "version"],
    },
  },
  apiKey: "5747ec3f93ee66da2d518af3eb239294",
});