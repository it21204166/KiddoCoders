const express = require('express')
const KiddoModel = require('../../models/KiddoModel/KiddoModel')
//const updateKiddo = require('../../models/KiddoModel/KiddoModel')


const router = express.Router()

/*  Search Supplier Details   */
router.get('/kiddodetails/search', (req, res) => {
    const orderQuery = req.query.q
    const regex = new RegExp(orderQuery, 'i')

    KiddoModel.find({ $or: [{ kiddoID: regex },{ kiddoName: regex }, { kiddoPhone: regex },{ kiddoEmail: regex },{ kiddoAge: regex }] }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            searchedDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

/* Add Suppliers */
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


module.exports = router

