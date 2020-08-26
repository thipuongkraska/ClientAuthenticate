/////
const bcrypt = require("bcrypt");
const Client = require("../models/Client");


/////////////////////////
const postRegister = (req,res) => {
  res.sendFile(__dirname + "/pages/register.html");
};
/////////////////////////////
const postLogin = (req,res) => {
  res.sendFile(__dirname + "/pages/login.html");
}
/////////////////////////////////
const postConfirmRegister = (req,res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (password===password2) {
    const hashPassword = bcrypt.hash(password, 10, (err,hash) => {
      if (!err) {
        const newClient = new Client({
          username: username,
          email: email,
          password: hash});
        newClient.save(() => res.render("yourpage", {username: username}));
      } else {console.log("register error");}
    });
  }
  else {res.send("Password incorrect");};
};
/////////////////////////////////
const postConfirmLogin = (req,res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  Client.findOne({username:username, email:email}, (err, foundUser) => {
    if (err) {res.send("Login failed");}
    else { if (foundUser) {
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result===true) {
          res.render("yourpage", {username: username});
        } else {console.log("error login");}
      });
    }}
  });
}

module.exports = {
  postRegister,
  postLogin,
  postConfirmRegister,
  postConfirmLogin
}
