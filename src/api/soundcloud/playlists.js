/**
 * SoundCloud playlists data service
 */

import { httpClient } from "./http.js";
import { htmlParser } from "./parser.js";

export class PlaylistsService {
  /**
   * Fetch user playlists
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Playlists data
   */
  async fetchPlaylists(username) {
    console.log(`🔍 Fetching playlists for: ${username}`);

    try {
      const playlistsUrl = httpClient.buildUrl(`/${username}/sets`);
      const html = await httpClient.fetchWithProxy(playlistsUrl);

      return this._extractPlaylistsData(html);
    } catch (error) {
      console.error(`❌ Failed to fetch playlists for ${username}:`, error);
      throw new Error(`Failed to load playlists: ${error.message}`);
    }
  }

  /**
   * Extract playlists data from HTML
   * @private
   * @param {string} html - HTML content
   * @returns {Array} Playlists data
   */
  _extractPlaylistsData(html) {
    const playlists = [];
    const doc = htmlParser.parseHtml(html);

    const playlistArticles = doc.querySelectorAll(
      'article[itemtype="http://schema.org/MusicPlaylist"]'
    );

    playlistArticles.forEach((article) => {
      const nameLink = article.querySelector(
        'h2[itemprop="name"] a[itemprop="url"]'
      );
      const authorLink = article.querySelector(
        'h2 a[href^="/"][href*="/"]:not([itemprop="url"])'
      );
      const timeElement = article.querySelector("time[pubdate]");
      const durationMeta = article.querySelector('meta[itemprop="duration"]');

      if (nameLink) {
        playlists.push({
          name: nameLink.textContent.trim(),
          url: `https://soundcloud.com${nameLink.getAttribute("href")}`,
          slug: nameLink.getAttribute("href").split("/").pop(),
          author: authorLink ? authorLink.textContent.trim() : "",
          authorUrl: authorLink
            ? `https://soundcloud.com${authorLink.getAttribute("href")}`
            : "",
          publishedAt: timeElement ? timeElement.getAttribute("datetime") : "",
          duration: durationMeta
            ? htmlParser.parseDuration(durationMeta.getAttribute("content"))
            : 0,
          type: "playlist",
        });
      }
    });

    return playlists;
  }
}

// Export singleton instance
export const playlistsService = new PlaylistsService();
