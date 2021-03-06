const mongoose = require("mongoose");
const { Schema } = mongoose;

const recommenderSchema = new Schema(
    {
        name: {type:String, required: [true, 'Recommender must have a name.'],unique: true },
        recommender_type: {type:String, required: [true, 'Is this a person or a group']},
        num_reviews: {type: Number, default: 0},   
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Recommender", recommenderSchema);
