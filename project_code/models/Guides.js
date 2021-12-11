const mongoose = require("mongoose");
const { Schema } = mongoose;

const guidesSchema = new Schema(
    {
      title: {type:String, required: [true, 'Please provide a title.']}, /* REQUIRED */
      author: String,
      format: {type:String, required: [true, 'Please specify the resource type.']},
      description: { type: String,  maxlength: [200, "Please keep the summary short."] },
      link: String,
      language: {type:String, required: [true, 'Please specify the language.']}, /* REQUIRED */
      key_themes: Array,
      difficulty: { type: Number, default: 5 },
      recommended_by: {type:String, required: [true, 'Who recommends this guide?']}, /* REQUIRED */
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Guides", guidesSchema);