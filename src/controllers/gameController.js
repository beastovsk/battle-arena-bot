const { Context, Telegraf } = require("telegraf");

const bot = new Telegraf("YOUR_BOT_TOKEN");

// Example command /start
bot.start((ctx) => ctx.reply("Welcome to the Telegram Game!"));

// Example command /help
bot.command("help", (ctx) => ctx.reply("Send /start to start the game."));

module.exports = { bot };
