require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const globalRouter = require("./const/router")
const cors = require("cors");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.716de.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST | "0.0.0.0"

const app = express();

app.get('/', function (req, res) {
  res.send('TEST1')
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api", globalRouter);

mongoose.connect(MONGO_URI, err => {
  if (err) return console.log(err);

  console.log("Connected to MongoDB");

  app.listen(PORT, HOST, () => {
    console.log(`Server is up and running on PORT: ${PORT}`)
  });
});