require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

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


/*Middleware*/


/*App routes*/
/*app.get("/", homeController.list);*/
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/guides",guidesController.list); /*method listed in guides controller - other methods: create, update, deleted*/



app.listen(PORT, () => {
    console.log(`Connect to app: http://localhost:${PORT}`);
  });
