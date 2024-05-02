const nodemailer=require('nodemailer')
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


/* Send Emails to Supplier */
router.post('/sendEmailKiddo', (req, res) => {
    
    const kiddoreciever = req.body.kiddoreciever
    const kiddoSubject = req.body.kiddoSubject
    const kiddomsg = req.body.kiddomsg

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kiddocoders@gmail.com',
            pass: ' q z g j f a s y m g j v i h e z '
        }
    })

    const mailOptions = {
        from: 'kiddocoders@gmail.com',
        to: kiddoreciever,
        subject: kiddoSubject,
        text: `${kiddomsg}\n\nThis is a auto generated email and send by Mananger of KiddoCoders Web.Please let me know if you have any questions or concerns. I look forward to hearing back from you soon.\n\nThank you for considering our inquiry.\n\nBest regards,\n\nDhanuka\n\nKiddoCoders\n\nkiddocoders@gmail.com`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error Occurred When Sending Email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email Sent Successfully');
        }
    })
})

module.exports = router