const { handleLobbyMessage, sendLobby } = require("../commands/lobbyCommands");
const { handleStartCommand } = require("../commands/startCommand");

const handleMessage = (bot, msg, userData) => {
	const chatId = msg.chat.id;

	if (!userData[chatId]) {
		bot.sendMessage(
			chatId,
			`Добро пожаловать, ${msg.chat.username}. Для запуска и регистрации нажми /start`
		);
	} else {
		handleLobbyMessage(bot, chatId, msg.text, userData);
	}
};

const handleCallbackQuery = (bot, query, userData) => {
	const chatId = query.message.chat.id;
	const user = userData[chatId];

	const [type, action, value] = query.data.split("_");

	switch (type) {
		case "head":
		case "body":
		case "foot":
		case "weapon":
			sendArsenalItem(bot, chatId, type, userData);
			break;
		case "back":
			sendLobby(bot, chatId, userData);
			return;
		case "back_to_arsenal":
			getArsenalStatus(bot, chatId, userData);
			return;
		default:
			bot.answerCallbackQuery(query.id, {
				text: "Выберите предмет из списка.",
			});
			return;
	}

	bot.answerCallbackQuery(query.id, { text: `Выбран предмет: ${value}` });
	getArsenalStatus(bot, chatId, userData);
};

module.exports = {
	handleMessage,
	handleCallbackQuery,
};
