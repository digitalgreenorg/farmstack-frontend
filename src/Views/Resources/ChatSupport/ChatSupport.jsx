import {
  Box,
  Divider,
  InputAdornment,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

const converstationListStyle = {
  minHeight: "40vh",
  maxHeight: "45vh",
  overflow: "auto",
};
const listStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "40vh",
  maxHeight: "45vh",
};
const ChatSupport = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const sentMessage = { text: message, sender: "user" };
    setConversation([...conversation, sentMessage]);

    // API call simulation
    const apiResponse = "hello";
    setConversation([
      ...conversation,
      sentMessage,
      { text: apiResponse, sender: "bot" },
    ]);
    setMessage("");
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  console.log("🚀 ~ ChatSupport ~ resourceId:", location?.state?.resourceId);
  return (
    <Box
      sx={{
        margin: "20px 50px 20px 50px",
      }}
    >
      <Paper
        sx={{
          margin: "auto",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Box sx={{ background: "#F6F6F6" }}>
          <Typography
            variant="h5"
            component="h3"
            style={{ color: "#424242", padding: "20px 0px 20px 0px" }}
          >
            Content Query
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "20px" }}>
          <List
            sx={conversation?.length ? converstationListStyle : listStyle}
            ref={chatContainerRef}
          >
            {conversation?.length ? (
              conversation?.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: msg.sender === "bot" ? "left" : "right",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "left",
                      backgroundColor:
                        msg.sender === "bot" ? "#f5f5f5" : "#d3ede6",
                      padding: "6px 13px",
                      borderRadius: "12px",
                      margin: "4px 0px 4px 0px",
                      maxWidth: "290px",
                      wordWrap: "break-word",
                    }}
                  >
                    {msg.text}
                  </Box>
                </ListItem>
              ))
            ) : (
              <Box sx={{ maxWidth: "36rem" }}>
                <span
                  style={{
                    color: "#424242",
                    fontWeight: 600,
                    letterSpacing: "1.2px",
                  }}
                >
                  Welcome to Content Query!{" "}
                </span>
                Type your question in the box below and hit send. Our system
                will help you find answers related to your resources and content
                files.
              </Box>
            )}
          </List>
          <div>
            <TextField
              name="query"
              label="Type your query"
              placeholder="Type your query"
              variant="outlined"
              fullWidth
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyPress}
              sx={{
                marginRight: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#919EAB",
                  },
                  "&:hover fieldset": {
                    borderColor: "#919EAB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#919EAB",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  borderRight: "1px solid #919EAB",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      onClick={sendMessage}
                      className="cursor-pointer"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatSupport;
