const express = require("express")
let QuestionModel = require("../../models/Tutorials/modelquestion");
const modelquestion = require("../../models/Tutorials/modelquestion");
const router = express.Router()

// Add Questio
router.post("/addQues", async (req, res) => {
    try {
        const { F_Name, Q_Email, Q_Question } = req.body;
        const newQuestion = new QuestionModel({
            F_Name,
            Q_Email,
            Q_Question
        });

        const result = await newQuestion.save();

        res.status(200).json({
            message: "Question added successfully",
            result,
        });
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//Get all questions
router.get("/getQues", async (req, res) => {
    try {
        const result = await QuestionModel.find();
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

//Get question from specific id
router.get("/getQues/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await QuestionModel.findById(id)

        return res.status(200).json({
            message: "Question Display Successfully!",
            result
        })
        
    } catch (err) {
        return res.status(400).json({
            message: err
        })
    }
})

//Update question
router.put("/editQues/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { F_Name, Q_Email, Q_Question } = req.body;
        const updateQues = { F_Name, Q_Email, Q_Question };

        await QuestionModel.findByIdAndUpdate(id, updateQues);

        return res.status(200).json({
            message: "Quiz Updated!"
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
})

// Delete quiz from list
router.delete("/deleteQues/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await QuestionModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Quiz details are deleted!",
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
});

// question search function

router.get('/getQues/search', (req, res) => {
    const searchQuery = req.query.q
    const regex = new RegExp(searchQuery, 'i')

    QuestionModel.find({ $or: [{  Q_Question: regex }, {F_Name : regex },] }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            searchedDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})



module.exports = router