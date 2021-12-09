require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const expressSession = require("express-session");
const User = require("./models/User");

const app = express();
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;

/*Database*/
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("ERROR: Could not connect to mongoDB.");
    process.exit();
  });


/* Controllers*/
const guidesController = require("./controllers/guides");
const userController = require("./controllers/user");

/*Middleware*/


/*App routes*/
/*app.get("/", homeController.list);*/
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/guides",guidesController.list); /*method listed in guides controller - other methods: create, update, deleted*/


/* Users */
app.get("/signup", (req, res) => {
  res.render('signup', { errors: {} })
});
app.post("/signup", userController.create);


app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});
app.post("/login", userController.login);


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

/** app.get("/", homeController.list);**/

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})




app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });


