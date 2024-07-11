const { sendLobby } = require("./lobbyCommands");

const handleStartCommand = (bot, chatId, msg, userData) => {
	userData[chatId] = {
		username: msg.chat.username,
		lobbyState: "main",
		stats: {
			level: 1,
			money: 100,
			hp: 100,
			power: 25,
			win: 0,
			lost: 0,
		},
		arsenal: {
			head: null,
			body: null,
			foot: null,
			weapon: null,
		},
		inventory: {
			head: ["Helmet of Power", "Magic Crown"],
			body: ["Knight's Armor", "Robe of Sorcery"],
			foot: ["Steel Boots", "Leather Shoes"],
			weapon: ["Sword of Destiny", "Wand of Magic"],
		},
	};

	sendLobby(bot, chatId, userData);
};

module.exports = {
	handleStartCommand,
};
