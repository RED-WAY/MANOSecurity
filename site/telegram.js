const TelegramBot = require("node-telegram-bot-api");
const token = "5785472072:AAG2umyIttkO1Hyyc6-k3-8ETNQr9sU3AX4";
const bot = new TelegramBot(token, { polling: true });

const database = require("./src/database/config");
const emailRegex = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
);

bot.on("message", (message) => {
  const chatId = message.chat.id;
  console.log(message);
  const msg = message.text
    .toLowerCase()
    .trimStart()
    .trimEnd()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  const splitMsg = msg.split("\n");

  if (msg === "/start") {
    const firstName = message.from.first_name;
    bot.sendMessage(
      chatId,
      `Olá, ${firstName}. Eu sou o manoBOT!
      \nPara começar, faça o LogIn com a mesma conta do site do man.OS para receber notificações das suas máquinas registradas!
      \nDigite /login para começar o processo :)
      `
    );
  } else if (msg === "/login") {
    bot.sendMessage(
      chatId,
      `
      Para iniciarmos, me informe seu E-mail e senha em uma única mensagem, da seguinte forma:
      \nexemplo@email.com\nsenhadomanOS
      \n* É obrigatório as quebras de linha. 
      `
    );
  } else if (splitMsg.length === 2 && splitMsg[0].match(emailRegex)) {
    bot.sendMessage(
      chatId,
      `Atualizando...
      \nPor favor, aguarde alguns segundos...`
    );

    const dbQuery = `
        UPDATE consumer
          SET telegramId = '${chatId}'
            WHERE consumerEmail = '${splitMsg[0]}'
              AND consumerPassword = '${splitMsg[1]}';
  `;
    database.executeQuery(dbQuery);

    setTimeout(() => {
      const dbQuery = `
            SELECT consumerName 
              FROM consumer 
                WHERE telegramId = '${chatId}';
      `;
      database.executeQuery(dbQuery).then((res) => {
        const message =
          res.length === 1
            ? `Conectado ao usuário "${res[0].consumerName}" com sucesso!`
            : `Falha!\n\nUsuário não encontrado. :(`;
        bot.sendMessage(chatId, message);
      });
    }, 5000);
  } else if (msg === "/logout") {
    bot.sendMessage(
      chatId,
      `Removendo contato...
      \nPor favor, aguarde alguns segundos...`
    );

    const dbQuery = `
        UPDATE consumer
          SET telegramId = NULL
            WHERE telegramId = '${chatId}';
  `;
    database.executeQuery(dbQuery);

    setTimeout(() => {
      const dbQuery = `
            SELECT consumerName 
              FROM consumer 
                WHERE telegramId = '${chatId}';
      `;
      database.executeQuery(dbQuery).then((res) => {
        const message =
          res.length === 0
            ? `Contato desconectado com sucesso!`
            : `Falha!\n\nRemoção não foi completada. :(`;
        bot.sendMessage(chatId, message);
      });
    }, 5000);
  } else {
    bot.sendMessage(
      chatId,
      `
        Desculpe, não entendi :(
        \nDigite /help para visualizar os comandos disponíveis!
        `
    );
  }
});
