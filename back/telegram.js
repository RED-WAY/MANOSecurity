const TelegramBot = require("node-telegram-bot-api");
const token = "5755430418:AAGFotEAQ8i8ErqknS7jC67NutoGpGv77YE";
const bot = new TelegramBot(token, { polling: true });

const database = require("./src/database/config");
const emailRegex = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
);

bot.on("message", (message) => {
  const chatId = message.chat.id;
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
      \nPara começar, faça o **Log In** com a mesma conta do site do **[man.OS](manosecurity.sytes.net)** para receber notificações das suas máquinas registradas!
      \nDigite /login para começar o processo :)
      `,
      {
        parse_mode: "MARKDOWN",
      }
    );
  } else if (msg === "/help") {
    bot.sendMessage(
      chatId,
      `*Lista de Comandos*
      /help - Listagem dos comandos disponíveis.
      /start - Instruções iniciais.
      /manos - Link do site oficial.
      /login - Entre com sua conta man.OS e receba notificações :)
      /logout - Desconecte o contato com qualquer conta man.OS.
      `,
      {
        parse_mode: "MARKDOWN",
      }
    );
  } else if (msg === "/manos") {
    bot.sendMessage(
      chatId,
      `Site do MANOSecurity: **[manosecurity.sytes.net](manosecurity.sytes.net)**`,
      {
        parse_mode: "MARKDOWN",
      }
    );
  } else if (msg === "/login") {
    bot.sendMessage(
      chatId,
      `
      Para iniciarmos, me informe seu E-mail e senha em uma única mensagem, da seguinte forma:
      <code><b>\nexemplo@email.com\nsenhadomanOS</b></code>
      \n<b>É obrigatório as quebras de linha.</b>
      `,
      {
        parse_mode: "HTML",
      }
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
  } else if (msg === "/resumo") {
    bot.sendMessage(
      chatId,
      `Analisando dados...
      \nEsse processo pode ser um pouco mais demorado.
      \nPor favor, aguarde alguns segundos...`
    );
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
