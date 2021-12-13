const mongoose = require("mongoose");
const { Schema } = mongoose;

const recommenderSchema = new Schema(
    {
        name: {type:String, required: [true, 'Recommender must have a name.']},
        recommender_type: {type:String, required: [true, 'Is this a person or a group']},
        num_reviews: Number,   
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Recommender", recommenderSchema);

/* add a userid -
 when create if cannot find username in recommenders then create recommedner*/