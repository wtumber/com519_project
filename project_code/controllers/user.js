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
    try {
      const recommenderId = req.params.id;
      console.log(recommenderId) 
      const userId = req.session.userID;
      console.log(userId)
      
      const recommenderDetails = await Recommenders.findById(recommenderId);
      console.log(recommenderDetails.name)
      
      await User.updateOne(
        { _id:userId}, {
            $set: {
            recommender_name: recommenderDetails.name,
            recommender_id: recommenderId 
            }
        });
      res.redirect("/recommenders");
    } catch (e) {
      res.status(404).send({
        message: `Cannot join -  error ${id}.`,
      });
    }
  };
