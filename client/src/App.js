import React, { useState } from "react";
import { DKButton, DKIcon, DKIcons } from "deskera-ui-library";
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import ChatWindow from "./components/ChatWindow/ChatWindow";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" element={<Main />}/>}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Navigate replace to="/login"/>} />
    </Routes>
  );




  // const [message, setMessage] = useState('');
  // const [isFocused, setIsFocused] = useState(false);

  // const handleInputChange = (e) => {
  //   setMessage(e.target.value);
  // };

  // const handleSend = () => {
  //   if (message.trim()) {
  //     // Implement the send message logic here
  //     console.log("Message sent:", message);
  //     setMessage('');
  //   }
  // };

  // return (
  //   // <div className="app">
  //   //   <section className="side-bar">
  //   //     <div
  //   //       style={{
  //   //         display: 'inline-flex',
  //   //         marginTop: '20px',
  //   //         marginRight: '20px'
  //   //       }}
  //   //     >
  //   //       <DKButton
  //   //         className="bg-blue text-white"
  //   //         onClick={() => {}}
  //   //         style={{
  //   //           border: '1px',
  //   //           marginRight: '5px',
  //   //         }}
  //   //         title="New Chat"
  //   //       />
  //   //     </div>
  //   //     <ul className="history">
  //   //       chat history
  //   //     </ul>
  //   //     <nav>
  //   //       <p>chat gpt client</p>
  //   //     </nav>
  //   //   </section>
  //   //   <section className="main">
  //   //     <h1>Chat-Gpt</h1>
  //   //     <ul className="feed">
  //   //       {/* Chat messages will go here */}
  //   //     </ul>
  //   //     <div className="bottom-section">
  //   //       <div className="input-container">
  //   //         <input
  //   //           type="text"
  //   //           value={message}
  //   //           onChange={handleInputChange}
  //   //           onFocus={() => setIsFocused(true)}
  //   //           onBlur={() => setIsFocused(message.length === 0 ? false : true)}
  //   //           placeholder={isFocused ? "" : "Write message here"}
  //   //         />
  //   //         <div id="submit">
  //   //           <DKIcon
  //   //             src={DKIcons.ic_arrow_right_triangle}
  //   //             onClick={handleSend}
  //   //             className="ic-r"
  //   //           />
  //   //         </div>
  //   //       </div>
  //   //     </div>
  //   //   </section>
  //   // </div>
  //   <div>
  //     <Login/>
  //   </div>
  // );
};

export default App;
