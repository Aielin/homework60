import React from "react";
import { ListGroup } from "react-bootstrap";

interface Message {
  author: string;
  message: string;
  datetime: string;
}

interface MessagesListProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <ListGroup>
      {messages.map((msg, index) => (
        <ListGroup.Item key={index} className="message">
          <div className="message-content">
            <strong>{msg.author}: </strong> {msg.message}
          </div>
          <span className="message-time">
            {new Date(msg.datetime).toLocaleDateString()}{" "}
            {new Date(msg.datetime).toLocaleTimeString()}
          </span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MessagesList;
