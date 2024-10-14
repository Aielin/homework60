import React, { useEffect, useRef, useState } from "react";
import MessageForm from "../../Components/MessageForm/MessageForm.tsx";
import MessagesList from "../../Components/MessagesList/MessagesList.tsx";

interface Message {
  author: string;
  message: string;
  datetime: string;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const intervalRef = useRef<number | null>(null);
  const [author, setAuthor] = useState("");

  const getMessages = async () => {
    const url = "http://146.185.154.90:8000/messages";
    try {
      const response = await fetch(url);
      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (author: string, message: string) => {
    const url = "http://146.185.154.90:8000/messages";
    const params = new URLSearchParams();
    params.append("author", author);
    params.append("message", message);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    try {
      await fetch(url, {
        method: "POST",
        body: params,
      });
      await getMessages();
      intervalRef.current = setInterval(getMessages, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMessages();
    };

    fetchData().catch((error) => console.error('Error fetching initial data:', error));
    intervalRef.current = setInterval(getMessages, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h1>Chat Application</h1>
      <MessageForm
        onSendMessage={sendMessage}
        author={author}
        setAuthor={setAuthor}
      />
      <h2>Messages</h2>
      <MessagesList messages={messages} />
    </div>
  );
};

export default ChatContainer;
