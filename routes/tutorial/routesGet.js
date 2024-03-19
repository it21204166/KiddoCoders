const express = require('express')
const questionModel = require('../../models/Tutorials/modelquestion')

const router = express.Router()

router.get('/questionshow/get', (req, res) => {
    questionModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/questionshow/getSpec/:id', (req, res) => {
    questionModel.findById(req.params.id).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})