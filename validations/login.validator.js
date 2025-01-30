const { body } = require("express-validator");

const loginValidator = [
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Поле не может быть пустым!").notEmpty()
];

module.exports = loginValidator;
