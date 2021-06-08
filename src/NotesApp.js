import React, {useContext} from 'react';
import {Modal} from './components/Modal';
import NoteCard from './components/NoteCard';
import {AppContext} from './context/appContext';

export const NotesApp = () => {
  const {state, actions} = useContext(AppContext);
  const {modal, action, notes, currentNote} = state;
  const newNote = () => {
    actions.changeAction('new');
    actions.changeNote({title: '', content: ''});
    actions.toggleModal();
  };

  const notesComponent = notes.map((note) => (
    <NoteCard note={note} key={note._id} />
  ));

  return (
    <div className="NotesApp-container">
      <header>
        <h1>NotesApp</h1>
        <span>
          <strong>{state.currentUser} </strong>
          <button className="btn" onClick={actions.handleLogout}>
            Logout
          </button>
        </span>
      </header>
      <div className="Notes-container">{notesComponent}</div>
      <div onClick={newNote} className="btn-new-note">
        New Note
      </div>
      {modal && <Modal note={currentNote} action={action} />}
    </div>
  );
};
