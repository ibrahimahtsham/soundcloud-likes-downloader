/**
 * SoundCloud likes data service
 */

import { httpClient } from "./http.js";
import { htmlParser } from "./parser.js";

export class LikesService {
  /**
   * Fetch user likes
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Likes data
   */
  async fetchLikes(username) {
    console.log(`🔍 Fetching likes for: ${username}`);

    try {
      const likesUrl = httpClient.buildUrl(`/${username}/likes`);
      const html = await httpClient.fetchWithProxy(likesUrl);

      return this._extractLikesData(html);
    } catch (error) {
      console.error(`❌ Failed to fetch likes for ${username}:`, error);
      throw new Error(`Failed to load likes: ${error.message}`);
    }
  }

  /**
   * Extract likes data from HTML
   * @private
   * @param {string} html - HTML content
   * @returns {Array} Likes data
   */
  _extractLikesData(html) {
    const likes = [];
    const doc = htmlParser.parseHtml(html);

    const likeArticles = doc.querySelectorAll("article");

    likeArticles.forEach((article) => {
      const nameLink = article.querySelector(
        'h2[itemprop="name"] a[itemprop="url"]'
      );
      const authorLink = article.querySelector(
        'h2 a[href^="/"][href*="/"]:not([itemprop="url"])'
      );
      const timeElement = article.querySelector("time[pubdate]");

      if (nameLink) {
        const href = nameLink.getAttribute("href");
        const isPlaylist = href.includes("/sets/");

        likes.push({
          name: nameLink.textContent.trim(),
          url: `https://soundcloud.com${href}`,
          slug: href.split("/").pop(),
          author: authorLink ? authorLink.textContent.trim() : "",
          authorUrl: authorLink
            ? `https://soundcloud.com${authorLink.getAttribute("href")}`
            : "",
          publishedAt: timeElement ? timeElement.getAttribute("datetime") : "",
          type: isPlaylist ? "playlist" : "track",
        });
      }
    });

    return likes;
  }
}

// Export singleton instance
export const likesService = new LikesService();
