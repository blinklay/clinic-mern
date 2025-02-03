const { validationResult } = require("express-validator");
const Request = require("../models/Request.model");

async function createRequest(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

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

async function getRequests(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit;

    const requests = await Request.find().skip(skip).limit(limit)
    const totalRequests = await Request.countDocuments();

    res.status(200).json({
      requests,
      totalPages: Math.ceil(totalRequests / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить заявки!"
    })
  }
}

async function deleteRequest(req, res) {
  try {
    const { id } = req.params
    await Request.findByIdAndDelete(id)
    res.status(200).json({
      message: "Заявка удалена!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить заявку!"
    })
  }
}

module.exports = {
  createRequest, getRequests, deleteRequest
}