import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configuring Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const app = express();
app.use(express.json());


app.post('/email', async (req, res) => {
    try {
        const { email , subject, html} = req?.body;
        // For Admin
        await transporter.sendMail({
            from: 'afzalxdreader@gmail.com',
            to: email,
            subject,
            html
        });

        // For User
        await transporter.sendMail({
            from: 'afzalxdreader@gmail.com',
            to: email,
            subject: 'Testing',
            html: `<h1>Hello World Email Testing by Nodemailer</h1>`
        });
        return res.send({
            message: 'Email Send Successfully'
        })
    } catch (error) {
        console.log(`Error`, error);
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})