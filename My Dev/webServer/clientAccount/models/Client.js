const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const Client = new mongoose.model("Client", userSchema);

module.exports = Client;
