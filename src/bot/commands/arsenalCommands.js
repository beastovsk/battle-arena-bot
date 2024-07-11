const getArsenalStatus = (bot, chatId, userData) => {
	const user = userData[chatId];
	const arsenalOptions = [
		{ text: "Голова", callback_data: "head_get_null" },
		{ text: "Тело", callback_data: "body_get_null" },
		{ text: "Ноги", callback_data: "foot_get_null" },
		{ text: "Оружие", callback_data: "weapon_get_null" },
	];

	const keyboard = {
		inline_keyboard: [
			arsenalOptions.map(({ text, callback_data }) => ({
				text,
				callback_data,
			})),
			[{ text: "Назад в лобби", callback_data: "back_to_arsenal" }],
		],
	};

	bot.sendMessage(chatId, "Выберите тип экипировки для смены", {
		reply_markup: JSON.stringify(keyboard),
	});
};

const sendArsenalItem = (bot, chatId, type, userData) => {
	const user = userData[chatId];
	let items = [];

	switch (type) {
		case "head":
			items = user.inventory.head;
			break;
		case "body":
			items = user.inventory.body;
			break;
		case "foot":
			items = user.inventory.foot;
			break;
		case "weapon":
			items = user.inventory.weapon;
			break;
		default:
			return;
	}

	const keyboard = {
		inline_keyboard: [
			items.map((item) => ({
				text: item,
				callback_data: `${type}_${item}`,
			})),
			[{ text: "Назад в лобби", callback_data: "back_to_arsenal" }],
		],
	};

	bot.sendMessage(chatId, `Выберите предмет для ${type}:`, {
		reply_markup: JSON.stringify(keyboard),
	});
};

module.exports = {
	getArsenalStatus,
	sendArsenalItem,
};
