import React, {useContext, useState} from 'react';
import {AppContext} from '../../context/appContext';

export const Modal = ({note = {title: '', content: ''}}) => {
  const {state, actions} = useContext(AppContext);
  const [formValues, setFormValues] = useState(note ? note : state.currentNote);
  const {title, content} = formValues;

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title === '') {
      if (title && content) {
        actions.createNote({title, content});
      }
    } else {
      actions.editNote(note._id, {title, content});
    }
  };
  return (
    <div className="Modal">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col justify-between h-full"
      >
        <div className="flex flex-col">
          <label htmlFor="title">Note title: </label>
          <input
            required
            className="rounded"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Note text: </label>
          <textarea
            required
            onChange={handleInputChange}
            className="rounded"
            name="content"
            id="content"
            cols="30"
            rows="5"
            value={content}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mx-auto bg-green-300 py-2 px-4 rounded"
        >
          Save
        </button>
        <span onClick={actions.toggleModal} className="Modal-close-btn">
          Close
        </span>
      </form>
    </div>
  );
};
