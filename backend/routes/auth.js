// Ruta para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
// api/auth
router.post('/register', [
  check('username').not().isEmpty().withMessage('Name is not valid'),
  check('password')
    .isLength({min: 3})
    .withMessage('Password must be at least 3 characters'),
  authController.registerUser,
]);

router.post(
  '/login',
  check('username').not().isEmpty().withMessage('Name is not valid'),
  check('password')
    .isLength({min: 3})
    .withMessage('Password must be at least 3 characters'),
  authController.loginUser
);

router.get('/logout', authController.logoutUser);
module.exports = router;
