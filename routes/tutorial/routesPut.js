const express = require('express')
const questionModel = require('../../models/Tutorials/modelquestion')


const router = express.Router()

router.put('/otherquestion/put/:id', (req, res) => {
  
    const FirstName = req.body.FirstName
    const Email = req.body.Email
    const Question = req.body.Question
    
    
    questionModel.findByIdAndUpdate( {
        FullName,
        Email,
        Question,
        
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})