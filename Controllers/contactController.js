const nodemailer = require('nodemailer')

require('dotenv').config()

const sendContactMail = async (req, res) => {
    try {
        const { name, email, contact, event, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_LOGIN,
                pass: process.env.BREVO_SMTP_KEY,
            },
        })

        await transporter.verify();
        console.log("Brevo SMTP Connected Successfully");

        await transporter.sendMail({
            from: `"Ashish Swami Photo Films" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            subject: "New Photography Enquiry",

            html: `
            <h2>New Inquiry Received</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${contact}</p>

            <p><strong>Event:</strong> ${event}</p>

            <p><strong>Message:</strong> ${message}</p>
            `,
        });

        await transporter.sendMail({
            from: `"Ashish Swami Photo Films" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thank You for Contacting Us",
            html: `
                <h2>Hello ${name},</h2>

                <p>Thank you for contacting us.</p>

                <p>We have received your inquiry and will get back to you shortly.</p>

                <p>Regards,<br/>Ashish Swami Photo Films</p>
                `,
        });

        res.status(200).json({ success: true, msg: "Email sent succesfully" })
    } catch (error) {
        console.log(error)

        res.status(500).json({ success: false, msg: "failed to send email" })
    }
}

module.exports = { sendContactMail, };