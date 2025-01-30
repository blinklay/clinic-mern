const express = require("express")
const { login } = require("./controllers/user.controller")
const { default: mongoose } = require("mongoose")
const cookieParser = require("cookie-parser");
const { createRequest, getRequests, deleteRequest } = require("./controllers/request.controller");
const checkAuth = require("./middlewares/checkAuth");

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

app.get("/request", checkAuth, getRequests)

app.post("/login", login)
app.post("/request", createRequest)

app.delete("/request/:id", checkAuth, deleteRequest)

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error when starting the server:", err);
    process.exit(1)
  }

  console.log(`Server has been start on port: ${PORT}`);
})