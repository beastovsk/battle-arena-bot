const createKeyboard = (buttons) => {
	return {
		keyboard: buttons,
		resize_keyboard: true,
		one_time_keyboard: false,
	};
};

module.exports = {
	createKeyboard,
};
