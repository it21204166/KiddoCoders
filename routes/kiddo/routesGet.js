/*
const express = require('express')
const KiddoModel = require('../../models/KiddoModel/KiddoModel')
const updateKiddo = require('../../models/KiddoModel/KiddoModel')


const router = express.Router()


// Get Kiddos Details 
router.get('/kiddoavailable/get', (req, res) => {
    KiddoModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


// Update kiddo Details 
router.get('/Updatekiddos/get/:id', (req, res) => {
    updateKiddo.findById(req.params.id).exec().then((result) => {
        console.log(result)
        return res.status(200).json({
            success: true,
            existingDetails: result
        })
    }).catch((err) => {
        console.error(err)
        return res.json({
            success: false,
        })
    })
})

module.exports = router

*/
