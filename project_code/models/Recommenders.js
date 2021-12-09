const mongoose = require("mongoose");
const { Schema } = mongoose;

const recommendersSchema = new Schema(
    {
        username: {type:String, required: [true, 'User must have a username.']},
        twitter_handle: String,
        preferred_languages: Array,
        brief_intro: { type: String,  maxlength: [200, "Please keep the summary short."] },
        github_link: String,
        number_recommendations: Number,
        recommended_guides: Array    
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Recommenders", recommendersSchema);