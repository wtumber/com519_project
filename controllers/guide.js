const Guides = require("../models/Guide");
const Languages = require("../models/Language");
const Formats = require("../models/Format");
const Recommenders = require("../models/Recommender");
const bodyParser = require("body-parser");


exports.list = async (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const sortGuides = {"_id": -1} // timestamp

    try {
      const guides = await Guides.find({}).limit(limit).sort(sortGuides);

      res.render("guides", {
        guides: guides,
        limit: limit,
       });
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
  const format = await Formats.findById(req.body.format_id);
  const language = await Languages.findById(req.body.language_id);
  try {
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
      format_id: req.body.format_id,
      language_id: req.body.language_id,
      recommended_by_id: user.recommender_id
    })
    await Recommenders.updateOne({_id: user.recommender_id},
      { $inc:
        {num_reviews: +1}
      }
      );
    res.redirect('/guides')
  } catch (e) {
    if (e.errors) {
      const languages = await Languages.find({});
      const formats = await Formats.find({});

      res.render('add-guide', {languages: languages,
        formats: formats, 
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
    res.render("add-guide", {
      languages: languages,
      formats: formats, 
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
    const guide = await Guides.findById(id);
    if (!guide) throw Error("can't find guide");
    res.render('update-guide', {
      languages: languages,
      formats: formats,
      guide: guide,
      id: id,
      errors: {}
    });
  } catch (e) {
    if (e.errors) {
      res.render('update-guide', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `can't find guide ${id}`,
    });
  }
};


exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const format = await Formats.findById(req.body.format_id);
    const language = await Languages.findById(req.body.language_id);
    const findGuide = await Guides.findOne({_id: id, recommended_by_id: user.recommender_id})
    
    if (!findGuide) {
      Guides.create({
        title: req.body.title,
        author: req.body.author,
        format: format.content_format,
        description: req.body.description,
        link: req.body.link,
        language: language.name,
        key_themes: "",
        difficulty: req.body.difficulty,
        recommended_by: user.recommender_name,
        format_id: req.body.format_id,
        language_id: req.body.language_id,
        recommended_by_id: user.recommender_id
      })
      await Recommenders.updateOne({_id: user.recommender_id},
        { $inc:
          {num_reviews: +1}
        }
        );
      res.redirect('/guides')
    } 
    if (findGuide) {
      await Guides.updateOne(
        {_id: id, recommended_by_id: user.recommender_id},
        {$set: {
         title: req.body.title,
         author: req.body.author,
         format: format.content_format,
         description: req.body.description,
         link: req.body.link,
         language: language.name,
         key_themes: "",
         difficulty: req.body.difficulty,
         recommended_by: user.recommender_name,
         format_id: req.body.format_id,
         language_id: req.body.language_id,
         recommended_by_id: user.recommender_id
         }
       });
       res.redirect('/guides');
    }
  } catch (e) {
    if (e.errors) {
    if (!guide) throw Error("can't find guide");  
    //const languages = await Languages.find({});
    //const formats = await Formats.find({});
    //const guide = await Guides.findById(id);
    res.render('update-guide', {
      languages: languages,
      formats: formats,
      guide: guide,
      id: id,
      errors: e.errors});
    } 
  }
};
