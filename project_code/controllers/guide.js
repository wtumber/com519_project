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
    await Recommenders.updateOne({_id: user.recommender_id},
      { $inc:
        {num_reviews: -1}
      }
      );
    res.redirect("/guides");
  } catch (e) {
    res.status(404).send({
      message: `Cannot delete - guides.js error ${id}.`,
    });
  }
};

exports.create = async (req, res) => {
  try {

    //const recommender = await Recommenders.findById(req.body.recommended_by_id);
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
      recommended_by: user.recommender_name,
      //recommended_by: recommender.username,
      format_id: req.body.format_id,
      language_id: req.body.language_id,
      recommended_by_id: user.recommender_id
    })
    console.log(user.username)
    res.redirect('/?message=resource added')
  } catch (e) {
    if (e.errors) {
      const languages = await Languages.find({});
      const formats = await Formats.find({});
      const recommenders = await Recommenders.find({});
      res.render('add-guide', {languages: languages,
        formats: formats, 
        //recommenders: recommenders, 
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
    //const recommenders = await Recommenders.find({});
    res.render("add-guide", {
      languages: languages,
      formats: formats, 
     // recommenders: recommenders,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}


exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const languages = await Languages.find({});
    const formats = await Formats.find({});
    //const recommenders = await Recommenders.find({});
    const guide = await Guides.findById(id);
    if (!guide) throw Error("can't find guide");
    res.render('update-guide', {
      languages: languages,
      formats: formats,
      //recommenders: recommenders,
      tasters: tasters,
      id: id,
      errors: {}
    });
  } catch (e) {
    console.log(e)
    if (e.errors) {
      res.render('update-guide', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `can't find guide ${id}`,
    });
  }
};

/* if recommended_by_id does not match

const recommender = await Recommenders.findById(req.body.recommended_by_id);
 then Guides.create new document */

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    //const recommender = await Recommenders.findById(req.body.recommended_by_id);
    const format = await Formats.findById(req.body.format_id);
    const language = await Languages.findById(req.body.language_id);

    toUpdate = {$set: {
      title: req.body.title,
      author: req.body.author,
      format: format.content_format,
      description: req.body.description,
      link: req.body.link,
      language: language.name,
      key_themes: "",
      difficulty: req.body.difficulty,
      //recommended_by: recommender.username,
      format_id: req.body.format_id,
      language_id: req.body.language_id,
     // recommended_by_id: req.body.recommended_by_id/*user.recommended_by_id*/
      }
    }

    const guide = await Guides.updateOne({
       _id: id,
       recommended_by_id: req.body.recommended_by_id/*user.recommended_by_id*/
      },
      toUpdate,{ upsert: true });
    res.redirect('/?message=guide has been updated');

  } catch (e) {
    res.status(404).send({
      message: `could find guide ${id}.`,
    });
  }
};
