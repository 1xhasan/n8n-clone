// // const nodemailer = require('nodemailer');

// import nodemailer from "nodemailer";

// type GmailArgs = {
//   to: string;
//   subject: string;
//   text: string;
//   user: string;
//   pass: string;
// };

// const gmailNode = async ({ to, subject, text, user, pass }: GmailArgs) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: { user, pass },
//   });

//   const info = await transporter.sendMail({
//     from: user,
//     to,
//     subject,
//     text,
//   });

//   return info;
// };

// export default gmailNode;


import nodemailer from 'nodemailer';

type GmailArgs = {
  to: string;
  subject: string;
  text: string;
  user: string;
  pass: string;
};

const gmailNode = async ({ to, subject, text, user, pass }: GmailArgs) => {

// export const gmailNode = async ({ to, subject, text, user, pass }) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: user,
    to,
    subject,
    text,
  });

  return info;
};

export default gmailNode;

