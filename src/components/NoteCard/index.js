import React, {useContext} from 'react';
import {AppContext} from '../../context/appContext';

const NoteCard = ({note}) => {
  const {actions} = useContext(AppContext);

  const editNote = () => {
    actions.changeAction('edit');
    actions.changeNote(note);
    actions.toggleModal();
  };
  const deleteNote = () => {
    if (window.confirm('Delete Note?')) {
      actions.deleteNote(note._id);
    }
  };
  return (
    <div className="Note-card">
      <div className="Note-card-title">
        {note.title}
        <div className="Note-card-buttons">
          <i
            title="Editar"
            onClick={editNote}
            className="Note-card-title-btn far fa-edit"
          ></i>
          <i
            title="Borrar"
            onClick={deleteNote}
            className="Note-card-title-btn far fa-trash-alt"
          ></i>
        </div>
      </div>
      <p className="Note-card-content">{note.content}</p>
    </div>
  );
};

export default NoteCard;
