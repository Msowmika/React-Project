import React from 'react';


const NoteList = ({ notes }) => {
  const formatDate = (dateTime) => {
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Date(dateTime).toLocaleDateString('en-US', options);
  };

  return (
    <div className='note-list'>
      {notes.map(note => (
        <div key={note.id}  className='note-item'>
          
          <div className='notecontent'>
            <p className='notedate'>{formatDate(note.createdAt)}</p>
            <p className='notetext'>{note.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
