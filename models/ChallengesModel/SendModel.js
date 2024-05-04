const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sendModel = new Schema(
    {
        senderId: {
            type: String,
            required: true,
        },

        recieverId: {
            type: String,
            required: true,
        },

        challengeId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Send = mongoose.model("Send", sendModel);
module.exports = Send;
