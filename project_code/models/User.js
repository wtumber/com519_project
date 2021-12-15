const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: { type: String, required: [true, 'Please create a username.'], index: { unique: true } },
        email: { type: String, required: [true, 'Please provide an email address.'], index: { unique: true } },
        password: { type: String, required: [true, 'Please create a password.'], 
                                    minLength: [4, "Password too short."],
                                    maxLength: [14, "Password too long."] },
        handle: String,
        aboutme: { type: String, maxlength: [200, "Please keep this section short."] },
        recommender_name: String,
        saved: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Guide"
          },
        recommender_id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recommender"
          }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('Password hash error in User.js');
    }
})

module.exports = mongoose.model("User", userSchema);