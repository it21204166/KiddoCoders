const express = require("express");
let SendModel = require("../../models/ChallengesModel/SendModel");
const router = express.Router();

// Add new Message
router.post("/addMsg", async (req, res) => {
    try {
        const { senderId, recieverId, challengeId } = req.body;

        const newMsg = new SendModel({ senderId, recieverId, challengeId });

        await newMsg.save();

        return res.status(200).json({ message: "Message is sent" });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

// Get all messages
router.get("/getMsgs", async (req, res) => {
    try {
        const result = await SendModel.find();

        return res.status(200).json({ message: "Messages Displayed!", result });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

module.exports = router;
