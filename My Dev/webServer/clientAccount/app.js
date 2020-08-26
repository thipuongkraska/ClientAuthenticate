const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const todoRouter = require("./routers/todoRouter");
const dbConnection = require("./config/dbConnection");
const env = require("./config/env");
const {url, port} = env;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended: true}));

dbConnection(url);

app.use(todoRouter);

app.listen(port, () => console.log("server is running"));
