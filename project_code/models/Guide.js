const mongoose = require("mongoose");
const { Schema } = mongoose;

const guideSchema = new Schema(
    {
      title: {type:String, required: [true, 'Please provide a title.']}, 
      author: String,
      format: {type:String, required: [true, 'Please specify the resource type.']}, 
      description: { type: String,  maxlength: [200, "Please keep the summary short."] },
      link: String,
      language: {type:String, required: [true, 'Please specify the language.']},
      key_themes: Array,
      difficulty: { type: Number, default: 5 },
      recommended_by: {type:String, required: [true, 'Who recommends this guide?']},
      language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
      format_id: {
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

guideSchema.index({"$title": "text"});

module.exports = mongoose.model("Guide", guideSchema);