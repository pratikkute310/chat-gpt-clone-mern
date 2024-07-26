import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { fetchChats, addChat, fetchMessages, sendMessage } from "../Services/api";
import Message from "../Message";

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetchChats();
        setChats(response);
      } catch (error) {
        console.error("Error loading chats", error);
      }
    };
    loadChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const loadMessages = async () => {
        try {
          const response = await fetchMessages(selectedChat._id);
          setMessages(response.data);
        } catch (error) {
          console.error("Error loading messages", error);
        }
      };
      loadMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleAddChat = async () => {
    if (newChatName.trim()) {
      try {
        const response = await addChat({ name: newChatName });
        setChats([...chats, response.data]);
        setNewChatName("");
      } catch (error) {
        console.error("Error adding chat", error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      try {
        const response = await sendMessage(selectedChat._id, { messageBody: newMessage });
        console.log(response);
        setMessages((prevMessages) => [
          ...prevMessages,
          response.message,
          response.replyMessage,
        ]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  console.log(messages);

  const filteredMessages = messages.filter(msg => msg !== undefined);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <p className={styles.heading}>chat-gpt-client</p>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.flex_container}>
        <div className={styles.sidebar}>
          <button className={styles.new} onClick={handleAddChat}>
            + New Chat
          </button>
          <div className={styles.chat_list}>
            <ul>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <li key={chat._id} onClick={() => handleChatClick(chat)}>
                    {chat.title}
                  </li>
                ))
              ) : (
                <h4>No Chats here</h4>
              )}
            </ul>
          </div>
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="New Chat"
            className={styles.add_chat} /* Correct class name */
          />
        </div>
        <div className={styles.content}>
          {selectedChat ? (
            <div className={styles.chat_window}>
              <div className={styles.message_list}>
                {filteredMessages.map((msg) => (
                  <Message key={msg._id} message={msg} name="User Name" />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className={styles.message_input_container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className={styles.input}
                  />
                  <button type="submit" className={styles.submit_btn}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className={styles.no_chat_selected}>
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
