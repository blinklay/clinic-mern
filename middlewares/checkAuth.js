const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../constants")

function checkAuth(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({
      message: "Нет доступа!"
    })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Неверный токен!"
      })
    }

    res.user = decoded
    next()
  })
}

module.exports = checkAuth