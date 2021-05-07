const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//Set the path to access env variables
dotenv.config({ path: "./config/config.env" });

//Router
let apiRouter = require("./subscription");

const app = express();

// const server = http.createServer(app);
app.use(cors());
app.use(express.json());
//multer

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("It is working");
});

app.listen(5000, () => {
  console.log("Server started at 5000");
});
