const jwt = require("jsonwebtoken")
const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const { JWT_SECRET } = require("../constants")

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!"
      })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Введен неверный пароль!"
      })
    }

    const token = jwt.sign({
      email: user.email,
      id: user._id
    }, JWT_SECRET, {
      expiresIn: "24h"
    })

    res.cookie("token", token, { httpOnly: true })
    res.status(200).json({
      message: "Успешная авторизация!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизироваться!"
    })
  }
}

module.exports = {
  login
}