import nodemailer from 'nodemailer';

async function mailer(): Promise<void> {
  const emailTransporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.REACT_APP_EMAIL_USER,
      pass: process.env.REACT_APP__EMAIL_PASS,
    },
  });

  const sendMessage = async (to: string, subject: string, text: string): Promise<void> => {
    await emailTransporter.sendMail({
      from: process.env.REACT_APP_EMAIL_USER,
      to,
      subject,
      text,
    });
  };
  // todo remove test function call
  await sendMessage('kozlovaangelika09@gmail.com', 'confirmation code', '7595');
}

export default mailer;
