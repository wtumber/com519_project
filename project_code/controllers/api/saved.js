const User = require("../../models/User");


exports.create = async (req, res) => {
      const guideId = req.body.id;
      console.log(guideId);
      if ( !(guideId) || req.session.userID) {
        res.json({result: 'error'});
      }
      try {
        await User.updateOne({"_id": req.session.userID}, {$addToSet:{saved: guideId}})
      } catch (e) {
        res.json({result: 'save failed'});
      }
  }