const express = require("express");
let ChallengeModel = require("../../models/ChallengesModel/ChallengesModel");
const router = express.Router();

// Add new challenege
router.post("/addChallenge", async (req, res) => {
    try {
        const { title, description, scorePoints, timeDuration } = req.body;
        const newChallenge = new ChallengeModel({
            title,
            description,
            scorePoints,
            timeDuration,
        });

        const result = await newChallenge.save();

        res.status(200).json({
            message: "Challenge added successfully",
            result,
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Get all challenges
router.get("/getChallenges", async (req, res) => {
    try {
        const result = await ChallengeModel.find();

        res.status(200).json({
            message: "Challenges are displayed",
            result,
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Get only one challenge
router.get("/getChallenge/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ChallengeModel.findById(id);

        res.status(200).json({
            message: "Challenge is displayed!",
            result,
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Update Challenge
router.put("/editChallenge/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, scorePoints, timeDuration } = req.body;
        const updatedChallenge = {
            title,
            description,
            scorePoints,
            timeDuration,
        };

        await ChallengeModel.findByIdAndUpdate(id, updatedChallenge);

        res.status(200).json({ message: "Challenge is updated" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Delete challenge
router.delete("/deleteChallenge/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await ChallengeModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Challenge is deleted",
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;
