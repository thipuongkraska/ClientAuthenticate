require("dotenv").config();

const url = process.env.DB_URL;
const port = process.env.PORT;
const saltRound = process.env.SALT_ROUND;

module.exports = {url, port, saltRound};
