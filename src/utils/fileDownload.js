/**
 * File download utility functions
 */

export function downloadTextFile(content, filename, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`✅ Downloaded: ${filename}`);
}

export function showDownloadOptionsDialog(tracks, downloadService) {
  const options = [
    "1. Download batch script (.bat file for Windows)",
    "2. Download URL list (for manual copying)",
    "3. Download track data (JSON file)",
  ];

  const choice = prompt(
    `Choose download method:\n\n${options.join("\n")}\n\nEnter number (1-3):`
  );

  switch (choice) {
    case "1":
      downloadService.downloadBatchScript(tracks);
      break;
    case "2":
      downloadService.downloadUrlList(tracks);
      break;
    case "3":
      downloadService.downloadTrackList(tracks);
      break;
    default:
      if (choice !== null) {
        alert("Invalid choice. Please select 1-3.");
      }
  }
}
