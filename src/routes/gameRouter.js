const { Router } = require("express");
const { bot } = require("../controllers/gameController");

const router = Router();

// Route for webhook
router.post("/", bot.webhookCallback("/game-webhook"));

module.exports = router;
