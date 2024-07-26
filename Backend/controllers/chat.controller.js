const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


exports.getAllChats = async (req, res, next) => {
  await Chat.find({ userId: req.userId })
    .exec()
    .then((chats) => {
      res.status(200).send(chats);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.createChat = async (req, res, next) => {
  try {
    const title = req.body.title;
    const userId = req.userId; // Should be set by middleware

    console.log("Received title:", title); // Log title
    console.log("User ID from middleware:", userId); // Log userId

    // if (!userId || !title) {
    //   return res.status(400).json({ message: "Title and User ID are required" });
    // }

    const existingChat = await Chat.findOne({ userId: userId, title: title });

    if (existingChat) {
      return res.status(400).json({ message: "Chat Name Already Exists" });
    }

    const newChat = new Chat({
      title: title,
      userId: userId, // Ensure this is set
      createdAt: new Date(),
    });

    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: "Error creating chat", error });
  }
};


exports.updateChat = async (req, res, next) => {
  const updatedChatFields = req.body;

  updatedChatFields.createdAt = new Date();
  console.log(req.params.id);

  Chat.findByIdAndUpdate(req.params.id, updatedChatFields, { new: true })
    .then((updatedChat) => {
      if (!updatedChat) {
        return res.status(404).json({ error: "Chat not found" });
      }
      res.json(updatedChat);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.deleteChat = async (req, res, next) => {
  Chat.findByIdAndDelete(req.params.id)
    .then((deletedChat) => {
      if (!deletedChat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      res.json({
        message: "Chat Deleted Successfully",
        deletedChat: deletedChat,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.getChatMessages = async (req, res, next) => {
  let chatId = req.params.chatId;

  await Message.find({ userId: req.userId, chatId: chatId })
    .exec()
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.createChatMessage = async (req, res, next) => {
  let chatId = req.params.chatId;
  let messageBody = req.body.messageBody;

  if (!messageBody) {
    return res.status(400).json({ error: "Empty or Invalid Message body" });
  }

  let createdAt = new Date();
  
  const message = new Message({
    messageBody: messageBody,
    messageType: "User",
    chatId: chatId,
    userId: req.userId,
    createdAt: createdAt,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: messageBody }],
    model: "gpt-4o-mini",
    max_tokens: 200,

  });

  console.log(completion.choices[0].message.content);
  let replyMessage = completion.choices[0].message.content; // will change this later with openai api response

  let reply = new Message({
    messageBody: replyMessage,
    messageType: "AI",
    chatId: chatId,
    userId: req.userId,
    createdAt: createdAt,
  });

  try {
    await message.save();
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Error creating chat message" });
  }

  try {
    const result = await reply.save();
    res.status(200).json({
      message: message,
      message2: "Reply Generated successfully",
      replyMessage:reply
 });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Error creating chat message" });
  }
};
