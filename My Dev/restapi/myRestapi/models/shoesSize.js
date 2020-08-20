const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  brand: String,
  gender: Number,
  maxLength: Number,
  minLength: Number,
  size: Number,
});

const ShoesSize = mongoose.model("ShoesSize", schema);

module.exports = ShoesSize;
