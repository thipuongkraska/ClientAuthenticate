const ShoesSize = require("../models/shoesSize");


const getAll = async (req,res,next) => {
  try {
    const result = await ShoesSize.find({});
    return res.send(result);
  }
  catch(error) {next(error);}
};

const postAll = async (req,res,next) => {
  try {
    const brand = req.body.brand;
    const gender = req.body.gender;
    const maxLength = req.body.maxLength;
    const minLength = req.body.minLength;
    const size = req.body.size;
    const newShoes = new ShoesSize({brand:brand, gender:gender, maxLength:maxLength, minLength:minLength, size:size});
    await newShoes.save();
    return res.json({
      "message" : "successfully created",
      "data" : newShoes,
    });
  }
  catch(error) {next(error);};
};

const deleteAll = async (req,res,next) => {
  try {
    await ShoesSize.deleteMany({});
    return res.send("successfully deleted!");
  }
  catch(error) {next(error);};
};

module.exports = {getAll, postAll, deleteAll};
