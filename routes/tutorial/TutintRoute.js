const express = require("express")
let TutintModel = require("../../models/Tutorials/modeltutint");
const modeltutint = require("../../models/Tutorials/modeltutint");
const router = express.Router()

// Add tute for intermediates
router.post("/addTut2", async (req, res) => {
    try {
        const { Title2, Desc2, Syntax2 } = req.body;
        const newTute2 = new TutintModel({
            Title2,
            Desc2,
            Syntax2
        });

        const result = await newTute2.save();

        res.status(200).json({
            message: "Tute added successfully",
            result,
        });
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//Get all details
router.get("/getTut2", async (req, res) => {
    try {
        const result = await TutintModel.find();
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