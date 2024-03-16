const express = require('express')
const AddExersice = require('../../models/ExerciseModel/ExerciseModel')

const router = express.Router()

router.post('/exersice/post', (req, res) => {
    let newExercise = new AddExersice(req.body)

    newExercise.save().then(() => {
        console.log('new Exercise details are saved successfully')
        return res.status(200).json({
            success: "new Exercise details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});


module.exports = router