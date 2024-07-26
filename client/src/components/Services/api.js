import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return {headers: {
    authorization: token,
  }};
};

export const fetchChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/chat/getAllChats`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching chats", error);
    throw error;
  }
};

export const fetchMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/api/chat/${chatId}/message`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error("Error fetching messages", error);
    throw error;
  }
};

export const addChat = async (chatData) => {
  try {
    const data = {
      title: chatData.name,
    };
    const response = await axios.post(`${API_URL}/api/chat/createChat`, data,getAuthHeaders());
    return response;
  } catch (error) {
    console.error("Error adding chat", error);
    throw error;
  }
};

export const sendMessage = async (chatId, messageData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/chat/${chatId}/createMessage`,
      messageData, getAuthHeaders());
      console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error sending message", error);
    throw error;
  }
};
