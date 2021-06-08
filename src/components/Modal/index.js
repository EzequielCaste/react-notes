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
      <form onSubmit={handleSubmit} action="" className="Modal-form">
        <div className="Modal-form-control">
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
        <div className="Modal-form-control">
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
        <button disabled={state.isLoading} type="submit" className="btn">
          Save
        </button>
        <span onClick={actions.toggleModal} className="Modal-close-btn">
          Close
        </span>
      </form>
    </div>
  );
};
