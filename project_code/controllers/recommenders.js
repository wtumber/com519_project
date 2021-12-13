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

    const recommender = await Recommenders.findById(req.body.recommended_by_id);
    const format = await Formats.findById(req.body.format_id);
    const language = await Languages.findById(req.body.language_id);

    await Guides.create({
      title: req.body.title,
      author: req.body.author,
      format: format.content_format,
      description: req.body.description,
      link: req.body.link,
      language: language.name,
      key_themes: "",
      difficulty: req.body.difficulty,
      recommended_by: recommender.username,
      format_id: req.body.format_id,
      language_id: req.body.language_id,
      recommended_by_id: req.body.recommended_by_id/*user.recommended_by_id*/
    })
    console.log(user.username)
    res.redirect('/?message=resource added')
  } catch (e) {
    if (e.errors) {
      const languages = await Languages.find({});
      const formats = await Formats.find({});
      const recommenders = await Recommenders.find({});
      res.render('add-recommender', {languages: languages,
        formats: formats, 
        recommenders: recommenders, 
        errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}
  
exports.createView = async (req, res) => {
  try {
    const languages = await Languages.find({});
    const formats = await Formats.find({});
    const recommenders = await Recommenders.find({});
    res.render("add-recommender", {
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