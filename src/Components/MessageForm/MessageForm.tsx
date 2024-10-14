import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface MessageFormProps {
  onSendMessage: (author: string, message: string) => void;
  author: string;
  setAuthor: (author: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSendMessage(author, message);
    setAuthor("");
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group className="mb-3" controlId="formAuthor">
        <label>Your Name</label>
        <Form.Control
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMessage">
        <label>Message</label>
        <Form.Control
          as="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        <i className="bi bi-send"></i>
      </Button>
    </Form>
  );
};

export default MessageForm;
