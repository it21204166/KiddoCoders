/*
const express = require('express')
const updateKiddo = require('../../models/KiddoModel/KiddoModel')

const router = express.Router()



//  Update Kiddo Details 
router.put('/Updatekiddos/put/:id', (req, res) => {
    const id = req.params.id
    const kiddoName = req.body.kiddoName
    const kiddoPhone = req.body.kiddoPhone
    const kiddoAge = req.body.kiddoAge
    const kiddoCountry = req.body.kiddoCountry
 
    updateKiddo.findByIdAndUpdate(id, {
        kiddoName,
        kiddoPhone,
        kiddoAge,
        kiddoCountry,
        
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})



module.exports = router

*/