const User = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const {username, password} = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    let user = await User.findOne({username}).populate('notes').exec();

    if (user) {
      return res.status(400).json({msg: 'User already exists'});
    }

    user = new User(req.body);

    const payload = {
      user: {
        _id: user.id,
      },
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = jwt.sign(payload, process.env.REACT_APP_SECRET, {
      expiresIn: 3600,
    });

    res.json({ok: true, token, user});
    /*
const token = jwt.sign({_id: user.id}, process.env.REACT_APP_SECRET, {
      expiresIn: 300,
    });
    */

    // jwt.sign(
    //   payload,
    //   process.env.REACT_APP_SECRET,
    //   {
    //     expiresIn: 3600,
    //   },
    //   (error, token) => {
    //     if (error) throw error;
    //     res.json({ok: true, token, user});
    //   }
    // );
  } catch (error) {
    console.log(error);
    res.status(400).send('Error while creating new user.');
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {username, password} = req.body;

  try {
    let user = await User.findOne({username}).populate('notes').exec();

    if (!user) {
      return res.status(400).json({msg: 'User not found.'});
    }
    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({msg: 'Password incorrect.'});
    }

    const token = jwt.sign({_id: user.id}, process.env.REACT_APP_SECRET, {
      expiresIn: 300,
    });
    //req.session.authToken = token;
    console.log('correct login send user');
    res.json({ok: true, token, user});
  } catch (error) {
    res.status(400).json({ok: false, msg: error});
  }
};

exports.logoutUser = async (req, res) => {
  if (req.session) {
    delete req.session;
  }
  res.json({ok: true, msg: 'Logged out'});
};
