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
        return JSON.parse(match[1]);
      } catch (error) {
        console.error("Failed to parse hydration data:", error);
      }
    }

    return [];
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
}

// Export singleton instance
export const htmlParser = new HtmlParser();
