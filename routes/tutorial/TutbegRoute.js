const express = require("express")
let TutbegModel = require("../../models/Tutorials/modeltutbeg");
const modeltutbeg = require("../../models/Tutorials/modeltutbeg");
const router = express.Router()

// Add tute for beginners
router.post("/addTut", async (req, res) => {
    try {
        const { Title, Desc, Syntax } = req.body;
        const newTute = new TutbegModel({
            Title,
            Desc,
            Syntax
        });

        const result = await newTute.save();

        res.status(200).json({
            message: "Tute added successfully",
            result,
        });
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
});


//Get all details
router.get("/getTut", async (req, res) => {
    try {
        const result = await TutbegModel.find();
        return res.status(200).json({
            message: "Quizzes are displayed!",
            result,
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
});

module.exports = router;