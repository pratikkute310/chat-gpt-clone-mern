const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");
const { protect } = require('../middlewares/auth.js');

router.get("/getAllChats", protect, chatController.getAllChats);
router.post("/createChat", protect, chatController.createChat);

router.patch("/updateChat/:id", protect, chatController.updateChat);
router.delete("/deleteChat/:id", protect, chatController.deleteChat);

router.get("/:chatId/message", protect, chatController.getChatMessages);
router.post("/:chatId/createMessage", protect, chatController.createChatMessage);

module.exports = router;
