const Recommenders = require("../models/Recommender");
const User = require('../models/User');

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
    const recommenderId = await Recommenders.findOne({ name: req.body.name });
    await User.updateOne({_id: user._id},
      { $set:
        {recommender_name: req.body.name,
        recommender_id: recommenderId._id}
      }
      );
    //res.redirect('/recommenders')
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
  