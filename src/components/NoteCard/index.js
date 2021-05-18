import React from 'react';

const NoteCard = ({note, changeAction, toggle}) => {
  const editNote = () => {
    console.log('edit');
    changeAction('edit');
    toggle();
  };
  const deleteNote = () => {
    console.log('delete');
    changeAction('new');
  };
  return (
    <div className="Note-card">
      <h3 className="Note-card-title">
        {note.title}
        <i onClick={editNote} className="Note-card-title-btn far fa-edit"></i>
        <i
          onClick={deleteNote}
          className="Note-card-title-btn far fa-trash-alt"
        ></i>
      </h3>
      <p className="Note-card-content">{note.content}</p>
    </div>
  );
};

export default NoteCard;
