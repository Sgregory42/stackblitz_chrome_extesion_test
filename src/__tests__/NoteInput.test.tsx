import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NoteInput from '../components/NoteInput';

describe('NoteInput', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <NoteInput
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        screenshot={null}
        timestamp="00:00:00"
      />
    );

    expect(screen.getByPlaceholderText('Add your note (Timestamp: 00:00:00)')).toBeInTheDocument();
    expect(screen.getByText('Save Note')).toBeInTheDocument();
  });

  it('submits the note when the form is submitted', () => {
    render(
      <NoteInput
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        screenshot={null}
        timestamp="00:00:00"
      />
    );

    const textarea = screen.getByPlaceholderText('Add your note (Timestamp: 00:00:00)');
    fireEvent.change(textarea, { target: { value: 'Test note' } });

    const submitButton = screen.getByText('Save Note');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Test note');
  });

  it('closes the input when close button is clicked', () => {
    render(
      <NoteInput
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        screenshot={null}
        timestamp="00:00:00"
      />
    );

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays the screenshot when provided', () => {
    render(
      <NoteInput
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        screenshot="data:image/png;base64,testimage"
        timestamp="00:00:00"
      />
    );

    expect(screen.getByAltText('Video screenshot')).toBeInTheDocument();
  });
});