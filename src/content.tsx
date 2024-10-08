import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NoteInput from './components/NoteInput';

const ContentScript: React.FC = () => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.action === "open-note-input") {
        setShowNoteInput(true);
        setScreenshot(null);
      } else if (message.action === "open-note-input-with-screenshot") {
        setShowNoteInput(true);
        captureScreenshot();
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const captureScreenshot = () => {
    const video = document.querySelector('video');
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setScreenshot(canvas.toDataURL());
    }
  };

  const getCurrentTimestamp = (): string => {
    const video = document.querySelector('video');
    if (video) {
      const time = video.currentTime;
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return '00:00:00';
  };

  const handleSubmit = (text: string) => {
    // Simulate sending a request to a service
    console.log('Sending note:', { text, timestamp: getCurrentTimestamp(), screenshot });
    setShowNoteInput(false);
    setScreenshot(null);
  };

  return (
    <>
      {showNoteInput && (
        <NoteInput
          onSubmit={handleSubmit}
          onClose={() => setShowNoteInput(false)}
          screenshot={screenshot}
          timestamp={getCurrentTimestamp()}
        />
      )}
    </>
  );
};

const root = document.createElement('div');
root.id = 'youtube-notes-extension-root';
document.body.appendChild(root);

ReactDOM.render(<ContentScript />, root);