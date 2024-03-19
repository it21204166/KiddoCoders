const express = require('express')
const questionModel = require('../../models/Tutorials/modelquestion')


const router = express.Router()

router.post('/questionshow/post', (req, res) => {
    let newquestionshow = new questionModel(req.body)

    newquestionshow.save().then(() => {
        console.log('Questions  are saved successfully')
        return res.status(200).json({
            success: "Questions are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})

module.exports = router