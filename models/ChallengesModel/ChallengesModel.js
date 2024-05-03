const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const challengeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        scorePoints: {
            type: [String],
            required: true,
        },

        timeDuration: {
            type: Number,
            required: true,
        },

        answer: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;
