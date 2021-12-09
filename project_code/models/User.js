const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: { type: String, required: [true, 'Please create a username.'], unique: true },
        email: { type: String, required: [true, 'Please provide an email address.'], unique: true },
        password: { type: String, required: [true, 'Please create a password.'] },
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