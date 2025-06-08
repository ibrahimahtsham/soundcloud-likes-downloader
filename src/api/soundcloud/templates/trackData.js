/**
 * Track data JSON template generator
 */

export function generateTrackData(tracks) {
  const trackList = tracks.map((track, index) => ({
    id: index + 1,
    name: track.name,
    author: track.author,
    url: track.url,
    authorUrl: track.authorUrl,
    type: track.type,
    publishedAt: track.publishedAt,
    slug: track.slug,
  }));

  return JSON.stringify(trackList, null, 2);
}
