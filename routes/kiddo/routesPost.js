const express = require('express')
const AddKiddo = require('../../models/KiddoModel/KiddoModel')

const router = express.Router()

router.post('/kiddoavailable/post', (req, res) => {
    let newkiddoavailable = new AddKiddo(req.body)

    newkiddoavailable.save().then(() => {
        console.log('new user details are saved successfully')
        return res.status(200).json({
            success: "new user details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});


module.exports = router