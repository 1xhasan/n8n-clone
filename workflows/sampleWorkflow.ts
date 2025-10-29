import type { Request, Response } from 'express';
import telegramNode from '../telegram/telegram';
import gmailNode from '../gmail/gmail';

require('dotenv').config();

const runWorkflow = async (
  req: Request<{}, {}, {}, { msg?: string }>,
  res: Response
) => {

  
  try {
    const message = req.query.msg ?? '';
    const chatId = process.env.TELEGRAM_CHAT_ID ?? '';
    const token = process.env.TELEGRAM_BOT_TOKEN ?? '';

    console.log(`Message Received from Request :: ${message}`);
    // Telegram Node
    const tgResponse = await telegramNode({
      message,
      chatId,
      token,
    });
    console.log('Telegram response:', tgResponse);

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;
    if (!user || !pass) {
      throw new Error('Missing GMAIL_USER or GMAIL_PASS env vars');
    }

    // Gmail Node    
    const emailResponse = await gmailNode({
      to: 'mahhasanori@gmail.com',
      subject: 'Github Commits',
      text: message,
      user,
      pass,
    });
    console.log('Gmail response:', emailResponse);
    return { telegram: tgResponse, email: emailResponse };
  } catch (err : any) {
    console.error('Workflow failed:', err);
    throw err;
  }
};

export default runWorkflow;
