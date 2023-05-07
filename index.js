const express = require("express");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
const { failureResponse, statusCodes, successResponse } = require("./utils/api-response");

// config dotenv
require("dotenv").config({
  path: "./config/.env"
});

const app = express();

const PORT = process.env.PORT || 8080;

// body parser
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true
//   })
// );

// cors
// allow access from client
const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      console.log(origin, "Not Allowed by Cors");
    }
  }
};

app.use(cors(corsOptions));

// routes
// Load routers
const userRouter = require("./routes/userRoute");
const scanRouter = require("./routes/scanRoute");

// Use routers
app.use("/user", userRouter);
app.use("/scan", scanRouter);
app.use("/", (req, res) => {
  successResponse(res, statusCodes.SUCCESS, "Bloom API. Server is up and running");
});

// handle other requests
app.use("*", (req, res) => failureResponse(res, statusCodes.NOT_FOUND, "route not found"));

app.listen(PORT, console.log(`app running on port ${PORT}`));
