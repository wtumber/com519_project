const Recommenders = require("../models/Recommenders");

exports.list = async (req, res) => {
    try {
      const recommenders = await Recommenders.find({});
      res.render("recommenders", { recommenders: recommenders });
    } catch (e) {
      res.status(404).send({ message: "could not list recommenders" });
    }
  };