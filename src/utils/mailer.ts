import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailTransporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMessage = async (to: string, subject: string, text: string): Promise<void> => {
  await emailTransporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export default sendMessage;
