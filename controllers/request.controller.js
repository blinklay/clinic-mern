const Request = require("../models/Request.model");

async function createRequest(req, res) {
  try {
    const newRequest = new Request({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      description: req.body.description,
    })

    await newRequest.save()

    res.status(200).json({
      message: "Новая заявка создана!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать заявку!"
    })
  }
}

module.exports = {
  createRequest
}