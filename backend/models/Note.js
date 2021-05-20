const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Note = {
  title: 'test title',
  author: {
    id: ,
    username: ,
  }
}
*/

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
});

module.exports = mongoose.model('Note', NoteSchema);
