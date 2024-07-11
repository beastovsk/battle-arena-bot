const TelegramBot = require("node-telegram-bot-api");
const {
	handleMessage,
	handleCallbackQuery,
} = require("./handlers/messageHandler");
const { handlePollingError } = require("./handlers/errorHandler");
const config = require("./config");

const bot = new TelegramBot(config.token, { polling: true });

console.log("Bot server started...");

const userData = {};

bot.on("message", (msg) => handleMessage(bot, msg, userData));
bot.on("callback_query", (query) => handleCallbackQuery(bot, query, userData));
bot.on("polling_error", (error) => handlePollingError(error));
