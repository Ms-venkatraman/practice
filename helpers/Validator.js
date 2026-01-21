const { check } = require("express-validator");

const Validator = {
  authvalidator: [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
      
    check('phone')
      .optional()
      .isLength({ min: 10, max: 10 })
      .withMessage('Phone number must be exactly 10 digits'),

    check('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ]
};

module.exports = Validator;
