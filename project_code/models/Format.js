const mongoose = require("mongoose");
const { Schema } = mongoose;

const formatSchema = new Schema(
    {format: 
        { type: String, required: [true, 'format is required'] 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Format", formatSchema);