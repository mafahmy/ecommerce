import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, html) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'durward.ruecker51@ethereal.email',
            pass: 'hdErr7xSxxqGYESvwW'
        }
    });
    
    // const transporter = nodemailer.createTransport({
    //     host: "smpt.gmail.com",
    //     port: 587,
    //     secure: false,
    //     requireTLS: true,
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASS,

    //     },
    //     tls: {
    //         ciphers: "SSLv3",
    //     }

    // });
    try {
        const info = await transporter.sendMail({
            from: "Store",
            to: email,
            subject: subject,
            html: html
        });
        console.log(`Message Sent: ${info.response}`);
      
    } catch (error) {
        return console.log`Problem Sending email: ${error} `;
    }
}