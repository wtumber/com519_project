const Guides = require("../models/Guide");
const Languages = require("../models/Language");
const Formats = require("../models/Format");
const Recommenders = require("../models/Recommender");
const bodyParser = require("body-parser");


exports.list = async (req, res) => {
    try {
      const guides = await Guides.find({});
      res.render("guides", { guides: guides });
    } catch (e) {
      res.status(404).send({ message: "could not list guides" });
    }
  };


exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Guides.findByIdAndRemove(id);
    res.redirect("/guides");
  } catch (e) {
    res.status(404).send({
      message: `Cannot delete - guides.js error ${id}.`,
    });
  }
};

exports.createView = async (req, res) => {
  try {
    const languages = await Languages.find({});
    const formats = await Formats.find({});
    const recommenders = await Recommenders.find({});
    res.render("add-guide", {
      languages: languages,
      formats: formats, 
      recommenders: recommenders,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}


exports.create = async (req, res) => {
  try {

    const recommender = await Recommenders.findById(req.body.recommender_id);
    await Guides.create({
      title: req.body.title,
      author: req.body.author,
      format: req.body.format_id,
      description: req.body.description,
      link: req.body.link,
      language: req.body.language_id,
      key_themes: "",
      difficulty: req.body.difficulty,
      recommended_by: recommender.username,
      recommended_by_id: req.body._id

    })

    res.redirect('/guides/?message=resource added')
  } catch (e) {
    if (e.errors) {
      res.render('create', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

