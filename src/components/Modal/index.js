import React, {useState} from 'react';

export const Modal = ({note = {title: '', content: ''}, toggle}) => {
  const [formValues, setFormValues] = useState(note);
  const {title, content} = formValues;

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    console.log('click');
    toggle();
  };

  const reset = () => {
    setFormValues({
      title: '',
      content: '',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title === '') {
      // new note
      if (title && content) {
        console.log('create');
      }
    } else {
      // edit note
      console.log('edit');
    }
    reset();
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
        <span onClick={handleClick} className="Modal-close-btn">
          Close
        </span>
      </form>
    </div>
  );
};
