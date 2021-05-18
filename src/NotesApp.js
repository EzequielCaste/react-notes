import React, {useState} from 'react';
import {Modal} from './components/Modal';
import NoteCard from './components/NoteCard';

export const NotesApp = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState('new');
  const toggleModal = () => {
    console.log('toggle');
    setModal((prev) => !prev);
  };
  const newNote = () => {
    setAction('new');
    toggleModal();
  };

  const notes = [
    {title: 'note 1', id: 1, content: 'note 1'},
    {title: 'note 2', id: 2, content: 'note 2'},
    {title: 'note 3', id: 3, content: 'note 3'},
  ];

  const notesComponent = notes.map((note) => (
    <NoteCard
      toggle={toggleModal}
      changeAction={setAction}
      note={note}
      key={note.id}
    />
  ));

  return (
    <div className="container">
      <h1>notes app</h1>
      <div className="Notes-container">{notesComponent}</div>
      <div onClick={newNote} className="btn-new-note">
        New Note
      </div>
      {modal && <Modal action={action} toggle={toggleModal} />}
    </div>
  );
};
