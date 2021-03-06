const express = require("express");
const router = require("./src/routers");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/", router);
app.use("/data", express.static("data"));

const port = 5002;

app.listen(port, () => {
  console.log(`Your server running on port ${port}`);
});
