const getIndex = require("../controller/getRequest");
const postRequest = require("../controller/postRequest");
const {postRegister, postLogin, postConfirmRegister, postConfirmLogin} = postRequest;

const express = require("express");
const todoRouter = express.Router();

todoRouter.route("/").get(getIndex);
todoRouter.route("/register").post(postRegister);
todoRouter.route("/login").post(postLogin);
todoRouter.route("/confirm-register").post(postConfirmRegister);
todoRouter.route("/confirm-login").post(postConfirmLogin);

module.exports = todoRouter;
