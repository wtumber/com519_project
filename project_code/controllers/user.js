const User = require('../models/User');
const bcrypt = require('bcrypt');
const Recommenders = require("../models/Recommender");

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.render('login', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;;
            res.redirect('/');
            return
        }

        res.render('login', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try {

        const user = new User({ 
            username: req.body.username, 
            email: req.body.email, 
            password: req.body.password,
            handle: req.body.handle,
            aboutme: req.body.aboutme
            });
        await user.save();
        res.redirect('/?message=user saved')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('signup', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}



exports.joinGroup = async (req, res) => {
    const recommenderId = req.params.id;
    const userId = user._id;
    try {
      const recommenderDetails = await Recommenders.findById(id);

      const userchange = await User.updateOne({ _id:userId},
        recommender_name = recommenderDetails.name,
        recommender_id = recommenderId
      );
      res.redirect("/recommenders");
    } catch (e) {
      res.status(404).send({
        message: `Cannot delete -  error ${id}.`,
      });
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
        res.render('add-guide', {languages: languages,
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