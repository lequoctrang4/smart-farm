require("dotenv").config({path: require('find-config')('.env') });
const sgMail = require('@sendgrid/mail')

export function sendEmail (to, subject, text, html){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    to: to, // Change to your recipient
    from: process.env.EMAIL, // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}