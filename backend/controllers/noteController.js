const Note = require('../models/Note');
const {validationResult} = require('express-validator');

exports.createNote = async (req, res) => {
  console.log(req.body);
};
