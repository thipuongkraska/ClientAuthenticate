const ShoesSize = require("../models/shoesSize");

const getArticle = async (req,res,next) => {
  try {
    const result = await ShoesSize.findOne({id: req.params.id});
    return res.json({
      "message": "successfully get data",
      "data": result,
    });
  }
  catch(error) {next(error);};
};

const putArticle = async (req, res, next) => {
  try {
    const {newUpdate} = req.body;
    const result = await ShoesSize.update({id: req.params.id}, {newUpdate}, {overwrite: true});
    res.json({
      "message": "successfully put an update",
      "data" : result,
    });
  }
  catch(error) {next(error);}
};

const patchArticle = async (req, res, next) => {
  try {
    const {newUpdate} = req.body;
    const result = await ShoesSize.update({id: req.params.id}, {$set: {newUpdate}});
    res.json({
      "message": "successfully patch an update",
      "data" : result,
    });
  }
  catch(error) {next(error);}
};

const deleteArticle = async (req, res, next) => {
  try {
    await ShoesSize.deleteOne({id: req.params.id});
    res.send("successfully deleted the article id: " + req.params.id);
  }
  catch(error) {next(error);}
};

module.exports = {
  getArticle,
  putArticle,
  patchArticle,
  deleteArticle,
};
