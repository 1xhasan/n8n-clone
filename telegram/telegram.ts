import axios from "axios";

type TelegramArgs = {
  message: string;
  chatId: string | number;
  token: string;
};

export default async function  telegramNode({ message, chatId, token }: TelegramArgs)  {

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await axios.post(url, {
      chat_id: chatId,
      text: message
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log(res.data)
    return res.data;
  } catch (e: any) {
    console.log("Error happened");
    console.log(e?.response?.data || e?.message || e);
  }
};