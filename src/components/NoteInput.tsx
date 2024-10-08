import React, { useState, useEffect } from 'react';

interface NoteInputProps {
  onSubmit: (text: string) => void;
  onClose: () => void;
  screenshot: string | null;
  timestamp: string;
}

const NoteInput: React.FC<NoteInputProps> = ({ onSubmit, onClose, screenshot, timestamp }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
    }
    return () => {
      if (video) {
        video.play();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Add your note (Timestamp: ${timestamp})`}
            style={styles.textarea}
          />
          {screenshot && (
            <img src={screenshot} alt="Video screenshot" style={styles.screenshot} />
          )}
          <button type="submit" style={styles.submitButton}>Save Note</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    position: 'relative' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    resize: 'vertical' as const,
  },
  screenshot: {
    maxWidth: '100%',
    height: 'auto',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default NoteInput;