const telegramNode = require('../telegram/telegram');
const gmailNode = require('../gmail/gmail');
require('dotenv').config();

const runWorkflow = async (req, res) => {

  
  try {
    // Telegram Node
    const tgResponse = await telegramNode({
      message: req.query.msg,
      chatId: process.env.TELEGRAM_CHAT_ID,
      token: process.env.TELEGRAM_BOT_TOKEN,
    });
    console.log('Telegram response:', tgResponse);

    // Gmail Node
    const emailResponse = await gmailNode({
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
