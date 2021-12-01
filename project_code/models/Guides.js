/* LAYOUT OF GUIDES
"title": 
"author(s)": ,
"published_date": ,
"link":,
"coding_language": 
"keywords": [],
"content_type": ,
"summary": ,
"difficulty": 
*/

const mongoose = require("mongoose");
const { Schema } = mongoose;

const guidesSchema = new Schema(
    {
      title: {type:String, required: [true, 'Please provide a title.']}, /* REQUIRED */
      author: String,
      published_date: String,
      link: String,
      coding_language: {type:String, required: [true, 'Please specify the guide language.']}, /* REQUIRED */
      keywords: Array,
      content_type: String,
      summary: { type: String,  maxlength: [200, "Please keep the summary short."] },
      difficulty: { type: Number, default: 5 },
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Guides", guidesSchema);