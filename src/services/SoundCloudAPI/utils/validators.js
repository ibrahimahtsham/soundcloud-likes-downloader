export function validateSoundCloudUrl(url) {
  const pattern = /^https?:\/\/(www\.)?soundcloud\.com\/[^\/\s]+\/?(\?.*)?$/;
  return pattern.test(url);
}

export function validateTrackData(track) {
  return (
    track &&
    typeof track.id !== "undefined" &&
    typeof track.title === "string" &&
    typeof track.permalink_url === "string"
  );
}
