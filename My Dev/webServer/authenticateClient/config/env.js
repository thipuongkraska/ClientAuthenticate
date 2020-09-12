require("dotenv").config();

const url = process.env.DB_URL;
const port = process.env.PORT;
const secret = process.env.SECRET;

module.exports = {url, port, secret};
