const nodemailer = require('nodemailer');

const gmailNode = async ({ to, subject, text, user, pass }) => {
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

module.exports = gmailNode;
