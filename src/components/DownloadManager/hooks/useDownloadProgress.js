import { sanitizeFilename } from "./fileUtils";

export async function downloadTrack(track) {
  console.log(`Downloading: ${track.title}`);

  // Mock download - in reality you'd need a service to convert SoundCloud streams to MP3
  const mockAudioUrl =
    "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA";

  const filename = sanitizeFilename(
    `${track.user?.username} - ${track.title}.mp3`
  );

  const link = document.createElement("a");
  link.href = mockAudioUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return Promise.resolve();
}

export function createDownloadQueue(tracks) {
  return tracks.map((track, index) => ({
    id: track.id,
    track,
    status: "pending",
    progress: 0,
    order: index,
  }));
}
