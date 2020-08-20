const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const dbConnection = require("./config/dbConnection");
const env = require("./config/env");
const port = env.port;
const url = env.url;

const expressRouter = require("./routers/expressRouter");

////////////PRE-middleware
///app.use(morgan("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

//////////////////////////DB dbConnection

dbConnection(url);
///////////////// routing request

app.use(expressRouter);

///////////// AF-middleware
app.use((req, res, next) => {
  const err = new Error("404 not found");
  err.status = 404;
  next(err);
});

//HandleError
app.use((err, req, res, next) => {
  const error =
    app.get("env") !== "production"
      ? err
      : {
          message: "Server error",
          status: 500,
        };

  return res.json({
    message: error.message,
    status: error.status,
  });
});

/////////////////////////
app.listen(port, () => console.log("server is running"));
