const userData = {};

const getUserData = (chatId) => userData[chatId];

const setUserData = (chatId, data) => {
	userData[chatId] = data;
};

module.exports = {
	getUserData,
	setUserData,
};
