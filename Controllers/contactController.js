const nodemailer = require('nodemailer')

require('dotenv').config()

const sendContactMail = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "New Photography Enquiry",

            html: `
            <h2>New Inquiry Received</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${phone}</p>

            <p><strong>Message:</strong> ${message}</p>
            `,
        });

        res.status(200).json({success:true , msg:"Email sent succesfully"})
    } catch (error) {
        console.log(error)

        res.status(500).json({success:false, msg:"failed to send email"})
    }
}

module.exports = {sendContactMail,};