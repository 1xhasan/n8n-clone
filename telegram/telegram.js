// const fetch = require('node-fetch');

const axios = require('axios');

const telegramNode = async ({ message, chatId, token }) => {
  // if (!message || !chatId || !token) throw new Error("Missing params for Telegram node");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  console.log("hello there")
  try {
    const res = await axios.post(url, {
      chat_id: '1296135988',
      text: message
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log(res.data)
    return res.data;
  } catch (e) {
    console.log("Error happened");
    console.log(e.errors);
  }
};


module.exports = telegramNode;