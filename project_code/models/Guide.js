const mongoose = require("mongoose");
const { Schema } = mongoose;

const guideSchema = new Schema(
    {
      title: {type:String, required: [true, 'Please provide a title.']}, 
      author: String,
      /*format: {type:String, required: [true, 'Please specify the resource type.']}, REQUIRED */
      description: { type: String,  maxlength: [200, "Please keep the summary short."] },
      link: String,
       /* language: {type:String, required: [true, 'Please specify the language.']},REQUIRED */
      key_themes: Array,
      difficulty: { type: Number, default: 5 },
      recommended_by: {type:String, required: [true, 'Who recommends this guide?']},
      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
      format: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Format"
      },
      recommended_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommender"
      }
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Guide", guideSchema);