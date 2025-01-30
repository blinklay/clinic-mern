const { body } = require("express-validator");

const requestValidator = [
  body("fullName", "Минимальная длина имени - 3 символа!").isLength({ min: 3 }),
  body("phoneNumber", "Некорректный номер телефона!").isMobilePhone("ru-RU"),
  body("description", "Описание должно быть минимум 10 символов!").isLength({ min: 10 })
];

module.exports = requestValidator;
