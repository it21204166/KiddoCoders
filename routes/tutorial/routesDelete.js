const express = require('express')
const otherquestionModel = require('../../models/Tutorials/modelquestion')


const router = express.Router()

router.delete('/question/delete/:id', (req, res) => {
    otherquestionModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('Question deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

module.exports = router