const telegramNode = require('../nodes/telegramNode');
const gmailNode = require('../nodes/gmailNode');
require('dotenv').config();

const runWorkflow = async () => {
  try {
    // Telegram Node
    const tgResponse = await telegramNode({
      message: "Hello Faisal",
      chatId: process.env.TELEGRAM_CHAT_ID,
      token: process.env.TELEGRAM_BOT_TOKEN,
    });
    console.log('Telegram response:', tgResponse);

    // Gmail Node
    const emailResponse = await gmailNode({
      to: 'recipient@example.com',
      subject: 'Test from n8n clone',
      text: 'Hello from Node.js workflow!',
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    });
    console.log('Gmail response:', emailResponse);
  } catch (err) {
    console.error(err);
  }
};

module.exports = runWorkflow;
