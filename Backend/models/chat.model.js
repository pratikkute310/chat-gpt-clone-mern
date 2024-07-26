const mongoose = require("mongoose");

// Define the schema for Chat
const chatSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Corrected to default
  },
});

// Create and export the Chat model
module.exports = mongoose.model("Chat", chatSchema);
