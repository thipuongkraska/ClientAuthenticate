const mongoose = require("mongoose");

const db = mongoose.connection;

const dbConnection = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.once("open", () => console.log("connected to mongodb"));
};

module.exports = dbConnection;
