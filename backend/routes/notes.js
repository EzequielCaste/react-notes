// Ruta para Crear Notas - CRUD
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const noteController = require('../controllers/noteController');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');

// api/notes/
// GET ALL NOTES
router.get('/', verify, async (req, res) => {
  console.log('api notes');
  // returns all notes of user that is logged in
  try {
    const userId = await jwt.verify(
      //req.session.authToken,
      req.headers['x-access-token'],
      process.env.REACT_APP_SECRET
    );
    const user = await User.findById(userId).populate('notes').exec();

    res.json({ok: true, user});
  } catch (error) {
    res.status(400).json({ok: false, msg: error});
  }
});

// api/notes/new
router.post('/new', verify, async (req, res) => {
  try {
    const userId = await jwt.verify(
      // req.session.authToken,
      req.headers['x-access-token'],
      process.env.REACT_APP_SECRET
    );
    const user = await User.findById(userId).populate('notes').exec();

    const newNote = await Note.create({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
    });
    user.notes.unshift(newNote);
    await newNote.save();
    await user.save();
    res.json({ok: true, msg: 'Nota creada', user, newNote});
  } catch (error) {
    res.status(400).json({error: error});
  }
});

router.put('/:id', verify, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    note.title = req.body.title;
    note.content = req.body.content;
    await note.save();
    res.json({ok: true, msg: 'Nota editada', updatedNote: note});
  } catch (error) {
    res.status(400).json({ok: false, msg: 'Error al editar nota.'});
  }
});

router.delete('/:id', verify, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ok: true, msg: 'Nota eliminada'});
  } catch (error) {
    res.status(400).json({ok: false, msg: 'Error al borrar nota'});
  }
});

module.exports = router;
