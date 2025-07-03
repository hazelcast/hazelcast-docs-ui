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
      pathsToMatch: ["https://docs.hazelcast.com/hazelcast/5.5/clients/**"],
      recordExtractor: ({ url, $ }) => {
        const RECORD_TYPE = {
          TITLE: 0,
          CONTENT: 1,
          DESCRIPTION: 2,
          SECTION_TITLE: 3,
          OPENAPI: 4,
        };
        // const contentSelectors = [".paragraph", ".admonitionblock td.content"];
        const isImdg = /\/imdg\//.test(url.pathname);
        const title = $(".doc  h1").text().trim();
        const version = $("#navbarProductVersion").text().trim();
        const product = $("#navbarProductName").text().trim();
        const records = [];

        const recordBase = {
          title: title,
          sections: [],
          version: version,
          product: product,
          pageRank: isImdg ? "-1000" : "0",
        };


        const getBreadcrumbs = () => {
          return $(".breadcrumbs")
            .find("li")
            .map(function () {
              return $(this).text().trim();
            }).toArray();
        };
        const createRecord = (type, sections, content, recordUrl) => {
          const record = {
            ...recordBase,
            type: type,
            sections: sections,
            breadcrumbs: getBreadcrumbs(),
            url: recordUrl,
          };
          if (content) {
            record.content = content;
          }
          return record;
        };

        const processParagraphs = (containerEl, sections, baseUrl) => {
          const paragraphRecords = [];
          containerEl.each((_i, contentEl) => {
            const content = $(contentEl).text().trim();
            if (content) {
              paragraphRecords.push(
                createRecord(RECORD_TYPE.CONTENT, sections, content, baseUrl),
              );
            }
          });
          return paragraphRecords;
        };

        const processSubsections = (sectionEl, sectionTitle) => {
          const subsectionRecords = [];
          $(sectionEl)
            .find(".sect2")
            .each((_i, subsectionEl) => {
              const subsectionTitle = $(subsectionEl).find("h3").text().trim();
              const subsectionAnchor = $(subsectionEl)
                .find("h3>a.anchor")
                .attr("href");
              const subsectionUrl = `${url}${subsectionAnchor}`;
              const subsectionSections = [sectionTitle, subsectionTitle];

              subsectionRecords.push(
                createRecord(
                  RECORD_TYPE.SECTION_TITLE,
                  subsectionSections,
                  null,
                  subsectionUrl,
                ),
              );
              subsectionRecords.push(
                ...processParagraphs(
                  $(subsectionEl).find(".paragraph"),
                  subsectionSections,
                  subsectionUrl,
                ),
              );

              $(subsectionEl)
                .find(".sect3")
                .each((_i, subsubsectionEl) => {
                  const subsubsectionTitle = $(subsubsectionEl)
                    .find("h4")
                    .text()
                    .trim();
                  const subsubsectionAnchor = $(subsubsectionEl)
                    .find("h4>a.anchor")
                    .attr("href");
                  const subsubsectionUrl = `${url}${subsubsectionAnchor}`;
                  const subsubsectionSections = [
                    sectionTitle,
                    subsectionTitle,
                    subsubsectionTitle,
                  ];

                  subsectionRecords.push(
                    createRecord(
                      RECORD_TYPE.SECTION_TITLE,
                      subsubsectionSections,
                      null,
                      subsubsectionUrl,
                    ),
                  );
                  subsectionRecords.push(
                    ...processParagraphs(
                      $(subsubsectionEl).find(".paragraph"),
                      subsubsectionSections,
                      subsubsectionUrl,
                    ),
                  );
                });
            });
          return subsectionRecords;
        };

        records.push(createRecord(RECORD_TYPE.TITLE, [], null, url));
        records.push(
          createRecord(
            RECORD_TYPE.DESCRIPTION,
            [],
            $("#preamble").text().trim(),
            url,
          ),
        );

        $(".sect1").each((_i, sectionEl) => {
          const sectionTitle = $(sectionEl).find("h2").text().trim();
          const sectionAnchor = $(sectionEl).find("h2>a.anchor").attr("href");
          const sectionUrl = `${url}${sectionAnchor}`;
          const sectionSections = [sectionTitle];

          records.push(
            createRecord(
              RECORD_TYPE.SECTION_TITLE,
              sectionSections,
              null,
              sectionUrl,
            ),
          );
          records.push(
            ...processParagraphs(
              $(sectionEl).find(".sectionbody>.paragraph"),
              sectionSections,
              sectionUrl,
            ),
          );
          records.push(...processSubsections(sectionEl, sectionTitle));
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
  apiKey: "",
});