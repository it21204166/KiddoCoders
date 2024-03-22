const express = require("express")
let FeedbackModel = require("../../models/Tutorials/modelfeedback")
const router = express.Router()

// Add Feedback
router.post("/addFeed", async (req, res) => {
    try {
        const { Fu_Name, F_Email, F_Visit, F_Service, F_Feedback } = req.body;
        const newFeedback = new FeedbackModel({
            Fu_Name,
            F_Email,
            F_Visit,
            F_Service,
            F_Feedback
        });

        const result = await newFeedback.save();

        res.status(200).json({
            message: "Feedback added successfully",
            result,
        });
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//Get all feedbacks
router.get("/getFeed", async (req, res) => {
    try {
        const result = await FeedbackModel.find();
        return res.status(200).json({
            message: "feedbacks are displayed!",
            result,
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
});

//Get feedback from specific id
router.get("/getFeed/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await FeedbackModel.findById(id)

        return res.status(200).json({
            message: "Feedback Display Successfully!",
            result
        })
        
    } catch (err) {
        return res.status(400).json({
            message: err
        })
    }
})

//Update feedback
router.put("/editFeed/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { Fu_Name, F_Email, F_Visit, F_Service, F_Feedback } = req.body;
        const updateFeed = { Fu_Name, F_Email, F_Visit, F_Service, F_Feedback };

        await FeedbackModel.findByIdAndUpdate(id, updateFeed);

        return res.status(200).json({
            message: "feedbacks Updated!"
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
})

// Delete feedbacks
router.delete("/deleteFeed/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await FeedbackModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "feedback details are deleted!",
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
});


module.exports = router