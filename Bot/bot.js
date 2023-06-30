const { Telegraf } = require("telegraf");
const TOKEN = "6274194101:AAGLeYbQj88EeD6uQrX7CC3g0SzlPTHFwLw";
const bot = new Telegraf(TOKEN);

const web_link = "https://luxury-mousse-473b3b.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :) to farmstack", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
