/**
 * HTTP client for SoundCloud API requests
 */

const CORS_PROXY = "https://api.allorigins.win/get?url=";

export class HttpClient {
  constructor(baseUrl = "https://soundcloud.com") {
    this.baseUrl = baseUrl;
    this.debug = false; // Add debug flag
  }

  /**
   * Enable or disable debug logging
   * @param {boolean} enabled - Whether to enable debug logging
   */
  setDebug(enabled) {
    this.debug = enabled;
  }

  /**
   * Fetch with CORS proxy
   * @param {string} url - URL to fetch
   * @returns {Promise<string>} HTML content
   */
  async fetchWithProxy(url) {
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;

    if (this.debug) {
      console.log(`🌐 Fetching URL: ${url}`);
      console.log(`🔗 Proxy URL: ${proxyUrl}`);
    }

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.contents) {
      throw new Error("No content received from proxy");
    }

    if (this.debug) {
      console.log(`📄 Raw HTML Response (${data.contents.length} characters):`);
      console.log(data.contents);
      console.log(`📊 Response Stats:`, {
        length: data.contents.length,
        url: data.status?.url || url,
        status: data.status?.http_code || "unknown",
      });
    }

    return data.contents;
  }

  /**
   * Build SoundCloud URL
   * @param {string} path - URL path
   * @returns {string} Full URL
   */
  buildUrl(path) {
    return `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
