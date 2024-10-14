import React from 'react';

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
    <ul className="list-group">
      {messages.map((msg, index) => (
        <li key={index} className="list-group-item">
          {msg.author}: {msg.message} (
          {new Date(msg.datetime).toLocaleDateString()} {new Date(msg.datetime).toLocaleTimeString()})
        </li>
      ))}
    </ul>
  );
};

export default MessagesList;