/**
 * HTML parsing utilities for SoundCloud data extraction
 */

export class HtmlParser {
  /**
   * Extract hydration data from HTML
   * @param {string} html - HTML content
   * @returns {Array} Hydration data array
   */
  extractHydrationData(html) {
    const match = html.match(/window\.__sc_hydration\s*=\s*(\[.*?\]);/);

    if (match) {
      try {
        const hydrationData = JSON.parse(match[1]);

        // Organize data by type for easier access
        const organizedData = {
          user: null,
          features: null,
          geoip: null,
          privacySettings: null,
          anonymousId: null,
        };

        hydrationData.forEach((item) => {
          if (item.hydratable && item.data) {
            organizedData[item.hydratable] = item.data;
          }
        });

        return organizedData;
      } catch (error) {
        console.error("Failed to parse hydration data:", error);
      }
    }

    return {};
  }

  /**
   * Parse DOM from HTML string
   * @param {string} html - HTML content
   * @returns {Document} Parsed DOM document
   */
  parseHtml(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  /**
   * Parse ISO 8601 duration to seconds
   * @param {string} duration - ISO 8601 duration string
   * @returns {number} Duration in seconds
   */
  parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Extract meta tag data
   * @param {string} html - HTML content
   * @returns {Object} Meta tag data
   */
  extractMetaData(html) {
    const doc = this.parseHtml(html);
    const metaData = {};

    // Extract SoundCloud specific meta tags
    const soundCloudMetas = doc.querySelectorAll('meta[property^="soundcloud:"]');
    soundCloudMetas.forEach((meta) => {
      const property = meta.getAttribute("property").replace("soundcloud:", "");
      metaData[property] = meta.getAttribute("content");
    });

    // Extract other useful meta tags
    const otherMetas = doc.querySelectorAll('meta[property^="og:"], meta[property^="twitter:"]');
    otherMetas.forEach((meta) => {
      const property = meta.getAttribute("property") || meta.getAttribute("name");
      if (property) {
        metaData[property] = meta.getAttribute("content");
      }
    });

    return metaData;
  }
}

// Export singleton instance
export const htmlParser = new HtmlParser();
