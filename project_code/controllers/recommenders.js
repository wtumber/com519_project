const Recommenders = require("../models/Recommender");
const Guides = require("../models/Guide");
const Languages = require("../models/Language");
const Formats = require("../models/Format");

exports.list = async (req, res) => {
    try {
      const recommenders = await Recommenders.find({});
      res.render("recommenders", { recommenders: recommenders });
    } catch (e) {
      res.status(404).send({ message: "could not list recommenders" });
    }
  };

exports.create = async (req, res) => {
  try {

    await Recommenders.create({
      name: req.body.name,
      recommender_type: req.body.recommender_type,
    })
    console.log(user.username)
    res.redirect('/?message=recommender added')
    /* add recommender reference to user */
  } catch (e) {
    if (e.errors) {
      res.render('add-recommender', {
        errors: e.errors })
        console.log(e.errors)
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}
  
/*exports.createView = async (req, res) => {

  try {

     const recommenders = await Recommenders.find({}); 

    res.render("add-recommender", {errors: {}});

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
} */