const mongoose = require("mongoose");
const { Schema } = mongoose;

const recommenderSchema = new Schema(
    {
        username: {type:String, required: [true, 'User must have a username.']},
        handle: String,
        aboutme: String,
        num_reviews: Number,   
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Recommender", recommenderSchema);