import React, { useState } from "react";
import DownloadButton from "./components/DownloadButton.jsx";
import DownloadProgress from "./components/DownloadProgress.jsx";
import DownloadQueue from "./components/DownloadQueue.jsx";
import { useDownloadManager } from "./hooks/useDownloadManager.js";

function DownloadManager({ selectedTracks, allTracks }) {
  const [showProgress, setShowProgress] = useState(false);
  const downloadManager = useDownloadManager();

  return (
    <>
      <DownloadButton selectedTracks={selectedTracks} allTracks={allTracks} />

      <DownloadProgress
        open={showProgress}
        onClose={() => setShowProgress(false)}
        progress={downloadManager.progress}
        errors={downloadManager.errors}
        downloading={downloadManager.downloading}
        onCancel={downloadManager.cancelDownload}
      />
    </>
  );
}

// Export individual components
export { DownloadButton, DownloadProgress, DownloadQueue, useDownloadManager };

// Default export
export default DownloadManager;
