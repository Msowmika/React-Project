import React, { useState } from 'react';
import image from './Vector (6).png'

const NoteInput = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (noteText.trim() === '') return; 
    onAddNote(noteText);
    setNoteText('');
  };

  return (
    <div className='notedata'>
      <div className='inputnotes'><textarea
        type="text"
        placeholder="  Enter your text here......"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      /></div>
      <button className='send' onClick={handleAddNote}><img src={image}></img></button>
    </div>
  );
};

export default NoteInput;
