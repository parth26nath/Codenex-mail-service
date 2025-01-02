const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// SMTP Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Email Route
app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        const info = await transporter.sendMail({
            from: `"Your Service" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text: message,
            html: `<p>${message}</p>`, // optional
        });
        res.status(200).json({ message: 'Email sent', info });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
