const Guides = require("../models/Guide");
const Language = require("../models/Language");
const Format = require("../models/Format");
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
    const languages = await Language.find({});
    const formats = await Format.find({});
    const recommenders = await Recommenders.find({});
    console.log(languages);
    console.log(formats);
    res.render("add-guide", {
      language: languages,
      format: formats, 
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

    })

    res.redirect('/guides/?message=guide has been added')
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

