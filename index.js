const express = require("express")
const { login } = require("./controllers/user.controller")
const { default: mongoose } = require("mongoose")
const cookieParser = require("cookie-parser");
const { createRequest } = require("./controllers/request.controller");

const PORT = process.env.PORT || 8080
const app = express()

app.use(cookieParser());
app.use(express.json())

mongoose.connect("mongodb+srv://admin:123qwe@cluster0.d86hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('DataBase has been conected!');
  })
  .catch(err => {
    console.log(err);
  })

app.post("/login", login)
app.post("/request", createRequest)

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error when starting the server:", err);
    process.exit(1)
  }

  console.log(`Server has been start on port: ${PORT}`);
})