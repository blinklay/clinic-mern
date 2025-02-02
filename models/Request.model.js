const { Schema, model } = require("mongoose");

const RequestSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

const Request = model("Request", RequestSchema)

module.exports = Request