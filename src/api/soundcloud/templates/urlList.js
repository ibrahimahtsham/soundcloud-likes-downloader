/**
 * URL list template generator
 */

export function generateUrlList(tracks) {
  return [
    "# SoundCloud Tracks - Copy these URLs to your preferred downloader",
    "# Recommended Windows tools:",
    "# - yt-dlp (command line): pip install yt-dlp",
    "# - 4K Video Downloader (GUI): https://www.4kdownload.com/",
    "# - JDownloader (GUI): https://jdownloader.org/",
    "# - Online services: scdl.com, snapsave.app, y2meta.com",
    "",
    ...tracks.map(
      (track, index) =>
        `# ${index + 1}. ${track.name} by ${track.author}\n${track.url}\n`
    ),
  ].join("\n");
}
