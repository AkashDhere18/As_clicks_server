// const nodemailer = require('nodemailer')

// require('dotenv').config()

// const sendContactMail = async (req, res) => {
//     try {
//         const { name, email, contact, event, message } = req.body;

//         const transporter = nodemailer.createTransport({
//             host: "smtp-relay.brevo.com",
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.BREVO_LOGIN,
//                 pass: process.env.BREVO_SMTP_KEY,
//             },
//         })

//         await transporter.verify();
//         console.log("Brevo SMTP Connected Successfully");

//         await transporter.sendMail({
//             from: `"Ashish Swami Photo Films" <${process.env.EMAIL_USER}>`,

//             to: process.env.EMAIL_USER,

//             subject: "New Photography Enquiry",

//             html: `
//             <h2>New Inquiry Received</h2>

//             <p><strong>Name:</strong> ${name}</p>

//             <p><strong>Email:</strong> ${email}</p>

//             <p><strong>Phone:</strong> ${contact}</p>

//             <p><strong>Event:</strong> ${event}</p>

//             <p><strong>Message:</strong> ${message}</p>
//             `,
//         });

//         await transporter.sendMail({
//             from: `"Ashish Swami Photo Films" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Thank You for Contacting Us",
//             html: `
//                 <h2>Hello ${name},</h2>

//                 <p>Thank you for contacting us.</p>

//                 <p>We have received your inquiry and will get back to you shortly.</p>

//                 <p>Regards,<br/>Ashish Swami Photo Films</p>
//                 `,
//         });

//         res.status(200).json({ success: true, msg: "Email sent succesfully" })
//     } catch (error) {
//         console.log(error)

//         res.status(500).json({ success: false, msg: "failed to send email" })
//     }
// }

// module.exports = { sendContactMail, };



// #####################################

const SibApiV3Sdk = require("sib-api-v3-sdk");

require("dotenv").config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendContactMail = async (req, res) => {
  try {
    const { name, email, contact, event, message } = req.body;

    // Email to Owner
    const ownerMail = await emailApi.sendTransacEmail({
      sender: {
        name: "Ashish Swami Photo Films",
        email: process.env.EMAIL_USER,
      },
      to: [
        {
          email: process.env.EMAIL_USER,
        },
      ],
      subject: "New Photography Enquiry",
      htmlContent: `
        <h2>New Inquiry Received</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${contact}</p>
        <p><strong>Event:</strong> ${event}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    // console.log("Owner Mail:", ownerMail);

    // Auto Reply
    const clientMail = await emailApi.sendTransacEmail({
      sender: {
        name: "Ashish Swami Photo Films",
        email: process.env.EMAIL_USER,
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      subject: "Thank You for Contacting Us",
      htmlContent: `
        <h2>Hello ${name},</h2>

        <p>Thank you for contacting us.</p>

        <p>We have received your inquiry and will get back to you shortly.</p>

        <p>Regards,<br><strong>Ashish Swami Photo Films</strong></p>
      `,
    });

    // console.log("Client Mail:", clientMail);

    res.status(200).json({
      success: true,
      msg: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      msg: "Failed to send email",
    });
  }
};

module.exports = { sendContactMail };