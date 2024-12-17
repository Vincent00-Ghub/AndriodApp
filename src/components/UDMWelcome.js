import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const UDMWelcome = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/");
    }
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newChatHistory = [...chatHistory, { sender: "user", message: userMessage }];
    setChatHistory(newChatHistory);

    const botResponse = getBotResponse(userMessage);
    setChatHistory([...newChatHistory, { sender: "bot", message: botResponse }]);
    setUserMessage("");
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I assist you today?";
    }
    if (lowerCaseMessage.includes("library hours") || lowerCaseMessage.includes("open")) {
      return "The library is open from 7 AM to 5 PM, Monday to Friday.";
    }
    if (lowerCaseMessage.includes("where is the library located?")) {
      return "The library is located near registrar, upper side of cashier.";
    }
    if (lowerCaseMessage.includes("books") || lowerCaseMessage.includes("borrow")) {
      return "You can borrow books by presenting your library ID at the circulation desk.";
    }
    return "Sorry, I didn't understand that. Please try rephrasing your question or contact library support.";
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Quick clickable questions
  const quickQuestions = [
    "what are the library hours?",
    "where is the library located?",
    "how can I borrow books?",
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Universidad_de_Manila_seal.png/180px-Universidad_de_Manila_seal.png"
          alt="UDMLibrary Logo"
          style={styles.logo}
        />
        <nav style={styles.nav}>
          <Link to="" style={styles.navLink}>Home</Link>
          <Link to="/books" style={styles.navLink}>Books</Link>
          <Link to="https://udmwebsite.udm.edu.ph/" style={styles.navLink}>FAQ</Link>
        </nav>
        <div onClick={toggleChat} style={styles.chatIconContainer}>
          <img
            src="https://e7.pngegg.com/pngimages/695/247/png-clipart-chatbot-logo-robotics-robot-electronics-leaf.png"
            alt="Chat Icon"
            style={styles.chatIcon}
          />
        </div>
      </header>
      <main style={styles.mainContent}>
        <div style={styles.translucentBox}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Universidad_de_Manila_seal.png/180px-Universidad_de_Manila_seal.png"
            alt="UDM Logo"
            style={styles.udmLogoOnTop}
          />
          <h1 style={styles.title}>Welcome to UDM Library</h1>
          <p style={styles.description}>
            Welcome to the UDM Library, a vibrant hub of knowledge and resources
            designed to support your learning journey. Explore our vast collection
            of books, journals, and digital media, all available to help you succeed
            academically and personally.
          </p>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </main>
      {isChatOpen && (
        <div style={styles.chatWindow}>
          <div ref={chatHistoryRef} style={styles.chatHistory}>
            {chatHistory.map((chat, index) => (
              <div key={index} style={chat.sender === "user" ? styles.userMessage : styles.botMessage}>
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
          {/* Display clickable questions */}
          <div style={styles.clickableQuestions}>
            {quickQuestions.map((question, index) => (
              <div
                key={index}
                style={styles.clickableQuestion}
                onClick={() => {
                  setUserMessage(question);
                  handleSendMessage();
                }}
              >
                {question}
              </div>
            ))}
          </div>
          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything..."
              style={styles.chatInput}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#004d00",
    color: "white",
    padding: "30px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundImage: 'url("https://images.summitmedia-digital.com/candy/images/2022/12/02/universidad-de-manila-application-tips.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  header: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    height: "40px",
  },
  nav: {
    display: "flex",
  },
  navLink: {
    margin: "0 15px",
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  chatIconContainer: {
    cursor: "pointer",
  },
  chatIcon: {
    height: "30px",
  },
  mainContent: {
    textAlign: "center",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  translucentBox: {
    backgroundColor: "rgba(0, 128, 0, 0.6)",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "800px",
    margin: "0 auto",
    color: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  udmLogoOnTop: {
    width: "80px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#FFD700",
    fontWeight: "bold",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.5",
  },
  logoutButton: {
    marginTop: "30px",
    padding: "12px 30px",
    backgroundColor: "#FFD700",
    color: "black",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  chatWindow: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#fff",
    width: "300px",
    height: "400px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    zIndex: "1000",
  },
  chatHistory: {
    flex: "1",
    overflowY: "scroll",
    padding: "10px",
  },
  userMessage: {
    textAlign: "right",
    backgroundColor: "#FFDF01",
    padding: "8px 12px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  botMessage: {
    textAlign: "left",
    backgroundColor: "Green",
    padding: "8px 12px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  chatInputContainer: {
    display: "flex",
    marginTop: "10px",
  },
  chatInput: {
    flex: "1",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 15px",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  clickableQuestions: {
    marginTop: "15px",
    padding: "10px 0",
    borderTop: "1px solid #ccc",
  },
  clickableQuestion: {
    margin: "10px 0",
    padding: "8px 10px",
    backgroundColor: "green", // Make background green to emphasize the border
    border: "2px solid green", // Green border
    borderRadius: "20px",
    color: "yellow", // yellow text
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s, border-color 0.3s", // Smooth transition for hover effects
  },
};

export default UDMWelcome;
