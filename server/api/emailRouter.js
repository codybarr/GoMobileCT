var express = require('express');
var emailRouter = express.Router();
const nodemailer = require('nodemailer');
const email_config = require('../config/email');

// Authentication Requires
const AuthenticationController = require('../controllers/authentication'),
    passportService = require('../config/passport'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


// Set up Transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_config.username,
        pass: email_config.password
    }
});

/*
 *  Server only route
 */

emailRouter.post('/email/contact', (req, res) => {
    // create reusable transporter object using the default SMTP transport

    console.log('Request body', req.body);

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Do Not Reply" <donotreply@gomobilect.com>', // sender address
        to: email_config.send_email_to, // list of receivers
        subject: 'GoMobileCT - Contact Form', // Subject line
        html: `<p>New message received from GoMobileCT Contact Form</p><br>
               <p>From: ${req.body.from}<br>
               Phone: ${req.body.phone}<br>
               Message: ${req.body.message}</p>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);

        res.json({message: 'Email sent successfully'});
    });
});

module.exports = emailRouter;
