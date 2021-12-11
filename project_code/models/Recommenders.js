const mongoose = require("mongoose");
const { Schema } = mongoose;

const recommendersSchema = new Schema(
    {
        username: {type:String, required: [true, 'User must have a username.']},
        handle: String,
        num_reviews: Number,   
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Recommenders", recommendersSchema);