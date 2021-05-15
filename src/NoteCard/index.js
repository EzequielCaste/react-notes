import React from 'react';

const NoteCard = ({note}) => {
  return (
    <div className="Note-card">
      <h3 className="Note-card-title">{note.title}</h3>
      <p className="Note-card-content">{note.content}</p>
    </div>
  );
};

export default NoteCard;
