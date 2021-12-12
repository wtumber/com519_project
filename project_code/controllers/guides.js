const Guides = require("../models/Guides");

exports.list = async (req, res) => {
    try {
      const guides = await Guides.find({});
      res.render("guides", { guides: guides });
    } catch (e) {
      res.status(404).send({ message: "could not list guides" });
    }
  };

exports.update
exports.delete

/* Add ability to delete, update,  list basic, 
when user == recommended by, allow update, delete, do not allow to write a review of it if already have*/