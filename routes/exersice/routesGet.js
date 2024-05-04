const express = require('express');
const ExerciseModel = require('../../models/ExerciseModel/ExerciseModel');

const router = express.Router();

router.get('/exercises/get/beginners', (req, res) => {
    ExerciseModel.find({ 'eUnder': 'Beginners' }).exec()
        .then((results) => {
            console.log(results);
            return res.status(200).json({
                success: true,
                existingDetails: results
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        });
});

router.get('/exercises/categories', async (req, res) => {
    try {
        const exercisesByCategory = await ExerciseModel.aggregate([
            { $match: { eUnder: 'Beginners' } }, // Filter exercises by 'eUnder' field
            { $group: { _id: '$eCategory', exercises: { $push: '$$ROOT' } } }
        ]);
        res.json({ exercisesByCategory });
    } catch (error) {
        console.error('Error fetching exercises grouped by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/exercises/categories/intermediate', async (req, res) => {
    try {
        const exercisesByCategory = await ExerciseModel.aggregate([
            { $match: { eUnder: 'Intermediate' } }, // Filter exercises by 'eUnder' field
            { $group: { _id: '$eCategory', exercises: { $push: '$$ROOT' } } }
        ]);
        res.json({ exercisesByCategory });
    } catch (error) {
        console.error('Error fetching exercises grouped by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/exercise/get/beginners/:id', (req, res) => {
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

router.get('/exercise/get/intermediate/:id', (req, res) => {
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

router.get('/exercises/get/intermediate', (req, res) => {
    ExerciseModel.find({ 'eUnder': 'Intermediate' }).exec()
        .then((results) => {
            console.log(results);
            return res.status(200).json({
                success: true,
                existingDetails: results
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        });
});



  

module.exports = router;
