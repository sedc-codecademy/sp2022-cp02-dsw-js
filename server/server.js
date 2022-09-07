require("dotenv").config();

const express = require('express');
const globalRouter = require("./const/router")
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST | "0.0.0.0"

app.get('/', function (req, res) {
  res.send('TEST1')
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api", globalRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up and running on PORT: ${PORT}`)
});