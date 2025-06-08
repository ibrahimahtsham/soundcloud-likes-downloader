/**
 * HTTP client for SoundCloud API requests
 */

const CORS_PROXY = "https://api.allorigins.win/get?url=";

export class HttpClient {
  constructor(baseUrl = "https://soundcloud.com") {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch with CORS proxy
   * @param {string} url - URL to fetch
   * @returns {Promise<string>} HTML content
   */
  async fetchWithProxy(url) {
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.contents) {
      throw new Error("No content received from proxy");
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
