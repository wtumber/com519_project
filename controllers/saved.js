const User = require("../models/User");
const Guide = require("../models/Guide");

exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({_id: user.id});
      const savedGuides = await Guide.find({
          _id: {$in: userRef.saved}});
      res.render('saved', {guides: savedGuides});
    } catch (e) {
      console.log(e);
      res.json({result: 'No saves - saved.js'}); 
    }
}