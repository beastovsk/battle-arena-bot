const TelegramBot = require("node-telegram-bot-api");

const token = "7163259719:AAEd6NG1lTKRHEbfD1XQcYM3sOXT1g0l9T4"; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

console.log("Bot server started...");

// Словарь для временного хранения данных пользователей (в памяти)
const userData = {};

// Обработчик события для входящих сообщений
bot.on("message", (msg) => {
	const chatId = msg.chat.id;

	// Проверяем, зарегистрирован ли пользователь
	if (!userData[chatId]) {
		// Если не зарегистрирован, просим пользователя зарегистрироваться с помощью /start
		bot.sendMessage(chatId, "Добро пожаловать, нажмите /start");
	} else {
		// Обрабатываем другие сообщения в сценарии лобби
		handleLobbyMessage(chatId, msg.text);
	}
});

// Обработчик события для команды /start
bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;

	// Симулируем процесс регистрации
	userData[chatId] = {
		username: msg.chat.username,
		lobbyState: "main", // Начальное состояние лобби
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
	};

	// Отправляем приветственное сообщение и интерфейс лобби
	sendLobby(chatId);
});

const getLobbyStatistic = (chatId) => {
	const user = userData[chatId];

	return `Ваша статистика:\nУровень: ${user.stats.level}\nАренайты: ${user.stats.money}\nОбщий HP: ${user.stats.hp}\nОбщая сила: ${user.stats.power}\n\nБитвы:\nПобед: ${user.stats.win}\nПоражений: ${user.stats.lost}`;
};

const getArsenalStatus = (chatId) => {
	const user = userData[chatId];
	const arsenal = user.arsenal;

	return `Ваш арсенал:\nГолова: ${arsenal.head || "Пусто"}\nТело: ${
		arsenal.body || "Пусто"
	}\nНоги: ${arsenal.foot || "Пусто"}\nОружие: ${
		arsenal.weapon || "Пусто"
	}\n\nОбщий HP: ${user.stats.hp}\nОбщая сила: ${user.stats.power}`;
};

// Функция для отправки сообщений лобби
function sendLobby(chatId) {
	const user = userData[chatId];

	// Создаем клавиатуру с кнопками
	const keyboard = {
		keyboard: [
			[{ text: "Поиск PvP" }, { text: "Поиск PvE" }, { text: "Лобби" }],
			[{ text: "Арсенал" }, { text: "Магазин" }, { text: "Донат" }],
			[{ text: "Как играть?" }],
		],
		resize_keyboard: true,
		one_time_keyboard: false,
	};

	// Отправляем сообщение о лобби с клавиатурой
	bot.sendMessage(chatId, getLobbyStatistic(chatId), {
		reply_markup: keyboard,
	});
}

// Функция для отправки интерфейса арсенала
function sendArsenal(chatId) {
	const keyboard = {
		keyboard: [
			[{ text: "Голова" }, { text: "Тело" }],
			[{ text: "Ноги" }, { text: "Оружие" }],
			[{ text: "Назад в лобби" }],
		],
		resize_keyboard: true,
		one_time_keyboard: false,
	};

	bot.sendMessage(chatId, getArsenalStatus(chatId), {
		reply_markup: keyboard,
	});
}

// Функция для обработки сообщений в сценарии лобби
function handleLobbyMessage(chatId, message) {
	const user = userData[chatId];

	bot.setMyCommands([{ command: "/start", description: "Начать" }]);

	switch (user.lobbyState) {
		case "main":
			// Обрабатываем основные действия в лобби на основе сообщения
			switch (message) {
				case "Поиск PvP":
					bot.sendMessage(chatId, "Ищем PvP матч...");
					// Реализация логики поиска матча PvP
					break;
				case "Поиск PvE":
					bot.sendMessage(chatId, "Ищем PvE матч...");
					// Реализация логики поиска матча PvE
					break;
				case "Лобби":
					bot.sendMessage(chatId, getLobbyStatistic(chatId));
					break;
				case "Арсенал":
					user.lobbyState = "arsenal";
					sendArsenal(chatId);
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
			// Обрабатываем действия в арсенале
			switch (message) {
				case "Голова":
					bot.sendMessage(chatId, "Ваши предметы для головы...");
					// Реализация логики отображения предметов для головы
					break;
				case "Тело":
					bot.sendMessage(chatId, "Ваши предметы для тела...");
					// Реализация логики отображения предметов для тела
					break;
				case "Ноги":
					bot.sendMessage(chatId, "Ваши предметы для ног...");
					// Реализация логики отображения предметов для ног
					break;
				case "Оружие":
					bot.sendMessage(chatId, "Ваши предметы для оружия...");
					// Реализация логики отображения предметов для оружия
					break;
				case "Назад в лобби":
					user.lobbyState = "main";
					sendLobby(chatId);
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
}

// Обработчик события для ошибок при опросе
bot.on("polling_error", (error) => {
	console.log("Ошибка опроса:", error);
});
