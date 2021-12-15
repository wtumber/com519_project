require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/User");
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;

/* Controllers - initialize before call*/
const guidesController = require("./controllers/guide");
const userController = require("./controllers/user");
const homeController = require("./controllers/home");
const recommendersController = require("./controllers/recommender");
const searchApiController = require("./controllers/api/guide");
const savedApiController = require("./controllers/api/saved");
const savedController = require("./controllers/saved");


/*Database*/
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  // useCreateIndex: true, 
  // autoIndex: true, 
 }).then(() => {
  console.log('Connected to database.');
});

mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("Not connecting to database.");
    process.exit();
  });


/*Middleware*/
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'dambry database', cookie: { expires: new Date(253402300000000) } }))


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

/*App routes*/

app.get("/", homeController.list);


/* Guides */
app.get("/guides",guidesController.list); /*method listed in guides controller - other methods: create, update, delete*/

app.get("/guides/delete/:id", guidesController.delete);

app.get("/add-guide", authMiddleware, guidesController.createView, (req, res) => {
  res.render("add-guide", { errors: {} });
});

app.post("/add-guide", guidesController.create);


//app.get("/update/:id", guidesController.edit); Attempt to provide errors to update-guide
app.get("/update/:id",guidesController.edit, (req, res) => {
  res.render('update-guide', { errors: {} })
});
app.post("/update/:id",guidesController.update);


/* Recommenders */
app.get("/recommenders",recommendersController.list);

app.get("/add-recommender", authMiddleware, (req, res) => {
  res.render("add-recommender", { errors: {} });
});
app.post("/add-recommender", recommendersController.create);

/* Users */
app.get("/signup", (req, res) => {
  res.render('signup', { errors: {} })
});
app.post("/signup", userController.create);

app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/user/join/:id", userController.joinGroup);

app.get("/user/leave/:id", userController.leaveGroup);

/* Search */
app.get("/search",(req,res) => {
  res.render('search', searchApiController);
});
app.get("/api/search", searchApiController.list);

/* Saved */
app.post("/api/saved", savedApiController.create);

app.get("/saved", savedController.list);

/* Local app */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });


