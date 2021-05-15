import React from 'react';
import NoteCard from './NoteCard';

export const NotesApp = () => {
  const notes = [
    {title: 'note 1', id: 1, content: 'note 1'},
    {title: 'note 2', id: 2, content: 'note 2'},
    {title: 'note 3', id: 3, content: 'note 3'},
  ];
  const notesComponent = notes.map((note) => (
    <NoteCard note={note} key={note.id} />
  ));
  return (
    <div className="container">
      <h1>notes app</h1>
      <div className="Notes-container">{notesComponent}</div>
      <div className="btn-new-note">New Note</div>
    </div>
  );
};
