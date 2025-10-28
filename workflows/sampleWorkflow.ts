const telegramNode1 = require('../telegram/telegram.ts');
const gmailNode1 = require('../gmail/gmail.ts');
require('dotenv').config();

const runWorkflow = async (
  req: import('express').Request,
  res: import('express').Response
) => {

  
  try {
    // Telegram Node
    const tgResponse = await telegramNode1({
      message: req.query.msg,
      chatId: process.env.TELEGRAM_CHAT_ID,
      token: process.env.TELEGRAM_BOT_TOKEN,
    });
    console.log('Telegram response:', tgResponse);

    // Gmail Node
    const emailResponse = await gmailNode1({
      to: 'mahhasanori@gmail.com',
      subject: 'Github Commits',
      text: req.query.msg,
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    });
    console.log('Gmail response:', emailResponse);
    res = emailResponse;
  } catch (err) {
    console.error(err);
  }
};

module.exports = runWorkflow;
