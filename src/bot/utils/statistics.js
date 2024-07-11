const getLobbyStatistic = (chatId, userData) => {
	const user = userData[chatId];

	return `Ваша статистика:\nУровень: ${user.stats.level}\nАренайты: ${user.stats.money}\nОбщий HP: ${user.stats.hp}\nОбщая сила: ${user.stats.power}\n\nБитвы:\nПобед: ${user.stats.win}\nПоражений: ${user.stats.lost}`;
};

module.exports = {
	getLobbyStatistic,
};
