const { body } = require("express-validator");

const requestValidator = [
  body("fullName", "Минимальная длина имени - 3 символа!").isLength({ min: 3 }),
  body("phoneNumber", "Некорректный номер телефона!").isMobilePhone("ru-RU")
];

module.exports = requestValidator;
