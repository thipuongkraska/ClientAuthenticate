const express = require("express");
const allArticlesControl = require("../controller/allArticlesControl");
const {getAll, postAll, deleteAll} = allArticlesControl;
const articleControl = require("../controller/articleControl");
const {getArticle, putArticle, patchArticle, deleteArticle} = articleControl;

const expressRouter = express.Router();

expressRouter.route("/").get(getAll).post(postAll).delete(deleteAll);
expressRouter.route("/:id").get(getArticle).put(putArticle).patch(patchArticle).delete(deleteArticle);

module.exports = expressRouter;
