require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const globalRouter = require("./const/router");
const cors = require("cors");
const helmet = require("helmet");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.716de.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/api", globalRouter);

mongoose.connect(MONGO_URI, (err) => {
  if (err) return console.log(err);

  console.log("Connected to MongoDB");
  console.log(process.env.MONGO_DB_NAME);

  app.listen(PORT, HOST, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
  });
});
