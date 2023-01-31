import { EMAIL, EMAIL_PASSWORD } from "../config";

import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import MAIL from "nodemailer/lib/mailer"

const transporter = nodemailer.createTransport(new SMTPTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
}))

export const sendEmail = async (email: string, code: string): Promise<void> => {
 
    const mailOptions: MAIL.Options = {
        from: EMAIL,
        to: email,
        subject: 'Email verification',
        text: `${email}, This is code to verify account : ${code}`
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('Send mail ' + info.response)
}
