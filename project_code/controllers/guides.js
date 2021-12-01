const Guides = require("../models/Guides");

exports.list = async (req, res) => {
    try {
      const guides = await Guides.find({});
      res.render("guides", { guides: guides });
    } catch (e) {
      res.status(404).send({ message: "could not list guides" });
    }
  };