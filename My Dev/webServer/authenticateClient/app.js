const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const env = require("./config/env");
const {url, port, secret} = env;
////cookies and session------
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
///////
////////Set up and middleware---------
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
////// Connect to mongodb--------
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.once("open", () => console.log("connected to mongodb"));
///// Create schema and Model --------
const userSchema = new mongoose.Schema({
  username: String,
  email : {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
  },
});
//// add plugin of passport-local-mongoose to schema
userSchema.plugin(passportLocalMongoose);
/////
const User = new mongoose.model("User", userSchema);
/// setup for Collection model
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

////route "/" ---------------
app.route("/")
.get((req,res) => {
  res.render("index");
})
.post((req,res) => {
  if(req.body.login) {
    res.render("login");
  }
  else {
    res.render("register");
  }
});
////route "homespace" -----------------
app.route("/homespace").get((req,res) => {
  if (req.isAuthenticated()) {
    res.render("homespace");
  } else {res.redirect("/")}
});
////route "login" ---------------
app.route("/login")
.get((req,res) => {
  res.render("login");
})
.post((req,res,err,next) => {
  if (err) {
    console.log(err);
    next(err);
  }
  else {
    const {username, email, password} = req.body;
    const currentUser = new User({
      username,
      email,
      password
    });
    req.login(currentUser, (err) => {
      if (err) {
        console.log(err);
        res.send("There is something wrong");
      }
      else {
        passport.authenticate("local") (req,res, function() {
          res.redirect("/homespace");
        });
      }
    });
  }
});
/////route "register" ---------------
app.route("/register")
.get((req,res) => {
  res.render("register");
})
.post((req,res) => {
  const {username, email, password} = req.body;
  console.log(typeof password);
  User.register({username, email}, password,  (err) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    }
    else {
      passport.authenticate("local") (req,res, function() {
        res.redirect("/homespace");
      });
    }
  });
});

//// route LogOut -----------
app.route("/logout").post((req,res) => {
  req.logout();
  res.redirect("/");
});

/////////
///////////// AF-middleware
app.use((req, res, next) => {
  const err = new Error("400 Bad Request");
  err.status = 400;
  next(err);
});

//HandleError
app.use((err, req, res, next) => {
  const error =
    app.get("env") !== "production"
      ? err
      : {
          message: "Server error",
          status: 500,
        };

  return res.json({
    message: error.message,
    status: error.status,
  });
});



app.listen(port, () => console.log("server is running"));
