const express = require('express')
const ExerciseModel = require('../../models/ExerciseModel/ExerciseModel')


const router = express.Router()




router.get('/exerciese/get', (req, res) => {
    ExerciseModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


router.get('/exercise/get/:id', (req, res) => {
    const exerciseId = req.params.id;
    ExerciseModel.findById(exerciseId)
        .then(exercise => {
            if (!exercise) {
                return res.status(404).json({
                    success: false,
                    message: 'Exercise not found'
                });
            }
            return res.status(200).json({
                success: true,
                exercise: exercise
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        });
});




module.exports = router