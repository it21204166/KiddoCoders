const express = require('express')

const ExerciseDelete=require('../../models/ExerciseModel/ExerciseModel')



const router = express.Router()



//disposed item delete
router.delete('/exercisedelete/delete/:id',(req,res)=>{
    ExerciseDelete.findByIdAndDelete(req.params.id).then(()=>{
        res.send('exercise deleted successfully')
    }).catch((err)=>{
        return res.status(500).send('Error occurred')
    })
})






module.exports=router