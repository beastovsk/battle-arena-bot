const { getLobbyStatistic } = require("../utils/statistics");
const { getArsenalStatus } = require("./arsenalCommands");

const sendLobby = (bot, chatId, userData) => {
	const keyboard = {
		keyboard: [
			[{ text: "Поиск PvP" }, { text: "Поиск PvE" }, { text: "Лобби" }],
			[{ text: "Арсенал" }, { text: "Магазин" }, { text: "Донат" }],
			[{ text: "Как играть?" }],
		],
		resize_keyboard: true,
		one_time_keyboard: false,
	};

	bot.sendMessage(chatId, getLobbyStatistic(chatId, userData), {
		reply_markup: keyboard,
	});
};

const handleLobbyMessage = (bot, chatId, message, userData) => {
	const user = userData[chatId];

	bot.setMyCommands([{ command: "/start", description: "Начать" }]);

	switch (user.lobbyState) {
		case "main":
			switch (message) {
				case "Поиск PvP":
					bot.sendMessage(chatId, "Ищем PvP матч...");
					break;
				case "Поиск PvE":
					bot.sendMessage(chatId, "Ищем PvE матч...");
					break;
				case "Лобби":
					bot.sendMessage(
						chatId,
						getLobbyStatistic(chatId, userData)
					);
					break;
				case "Арсенал":
					user.lobbyState = "arsenal";
					getArsenalStatus(bot, chatId, userData);
					break;
				case "Магазин":
					bot.sendMessage(chatId, "Посещаем Магазин...");
					break;
				case "Донат":
					bot.sendMessage(chatId, "Донируем...");
					break;
				case "Как играть?":
					bot.sendMessage(chatId, "Сам пока не знаю");
					break;
				default:
					bot.sendMessage(
						chatId,
						"Неверная команда в основном лобби."
					);
					break;
			}
			break;
		case "arsenal":
			switch (message) {
				case "Голова":
					sendArsenalItem(bot, chatId, "head", userData);
					break;
				case "Тело":
					sendArsenalItem(bot, chatId, "body", userData);
					break;
				case "Ноги":
					sendArsenalItem(bot, chatId, "foot", userData);
					break;
				case "Оружие":
					sendArsenalItem(bot, chatId, "weapon", userData);
					break;
				case "Назад в лобби":
					user.lobbyState = "main";
					sendLobby(bot, chatId, userData);
					break;
				default:
					bot.sendMessage(chatId, "Неверная команда в арсенале.");
					break;
			}
			break;
		default:
			bot.sendMessage(chatId, "Неверное состояние лобби.");
			break;
	}
};

module.exports = {
	sendLobby,
	handleLobbyMessage,
};
