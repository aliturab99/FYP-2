"use client"
import React, { useState, useEffect } from 'react';

const SYSTEM_PROMPT = `You are a medical assistant for a symptom-checker application.

**Rules:**
- Do not express sympathy, concern, or politeness.
- Do not explain that you are an AI.
- Do not recommend seeing a doctor unless adding the provided short disclaimer at the end.
- Only ask up to 2 short follow-up questions if needed.
- After receiving answers, suggest medicines from the product list if relevant.
- Responses must be short and only in clean HTML using <p>, <ul>, <li>, <strong>, and <br> tags.
- Do not include extra phrases like "I understand", "It sounds like", "As an AI", etc.
`;

const ChatBot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemPromptSent, setSystemPromptSent] = useState(false);
  const [initialSymptoms, setInitialSymptoms] = useState("");
  const [waitingForSystemPrompt, setWaitingForSystemPrompt] = useState(false);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([
        { sender: "ai", text: "Hello! What medical issue or symptoms are you facing at this time?" }
      ]);
    }
  }, [isChatbotVisible]);

  // Automatically send system prompt when chat is opened
  useEffect(() => {
    if (isChatbotVisible && !systemPromptSent) {
      setLoading(true);
      setWaitingForSystemPrompt(true);
      fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: SYSTEM_PROMPT.replace('{insert user symptoms here}', '') }),
      })
        .then(() => {
          setSystemPromptSent(true);
        })
        .finally(() => {
          setLoading(false);
          setWaitingForSystemPrompt(false);
        });
    }
  }, [isChatbotVisible, systemPromptSent]);

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    let promptToSend = input;
    if (initialSymptoms) {
      promptToSend = `User's symptoms: ${initialSymptoms}\nFollow-up: ${input}`;
    }
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend }),
      });
      const data = await res.json();
      if (data.result) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.result, isHtml: true }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: "Error: " + (data.error || "No response") }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Request failed" }]);
    }
    setLoading(false);
    // Save initial symptoms if not already set
    if (!initialSymptoms) setInitialSymptoms(input);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          left: '10px',
          zIndex: 1000,
          cursor: 'pointer',
          background: '#1a1a1a',
          color: '#1a1a1a',
          borderRadius: '50%',
          width: '52px',
          height: '52px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          fontWeight: 600,
          fontSize: 22,
          border: 'none',
        }}
        onClick={toggleChatbotVisibility}
        className='mb-[50dvh]'
        title="Open Medical Chatbot"
      >
        💬
      </div>

      {isChatbotVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 999,
            width: '350px',
            maxWidth: '95vw',
            height: '480px',
            maxHeight: '80vh',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
          }}
        >
          <div style={{
            background: '#2563eb',
            color: 'white',
            padding: '12px 16px',
            fontWeight: 600,
            fontSize: 16,
            borderBottom: '1px solid #e5e7eb',
            textAlign: 'center',
            letterSpacing: 0.5,
          }}>
            Medical Assistant
          </div>
          <div style={{ flex: 1, padding: 12, overflowY: 'auto', background: '#fff' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                margin: '8px 0',
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                display: 'flex',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
              }}>
                {msg.sender === 'ai' && msg.isHtml ? (
                  <span style={{
                    display: 'inline-block',
                    background: '#f3f4f6',
                    color: '#222',
                    borderRadius: 10,
                    padding: '8px 12px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    fontSize: 14,
                  }}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                ) : (
                  <span style={{
                    display: 'inline-block',
                    background: msg.sender === 'user' ? '#2563eb' : '#f3f4f6',
                    color: msg.sender === 'user' ? 'white' : '#222',
                    borderRadius: 10,
                    padding: '8px 12px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    fontSize: 14,
                  }}>{msg.text}</span>
                )}
              </div>
            ))}
            {(loading || waitingForSystemPrompt) && <div style={{ color: '#2563eb', textAlign: 'center', marginTop: 18, fontWeight: 500, fontSize: 14 }}>
              Gemini is preparing your medical assistant...
            </div>}
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid #e5e7eb', background: '#fff', padding: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={waitingForSystemPrompt ? "Please wait..." : "Type your message..."}
              style={{
                flex: 1,
                padding: 10,
                border: '1px solid #e5e7eb',
                outline: 'none',
                borderRadius: 8,
                fontSize: 14,
                background: '#f9fafb',
                marginRight: 8,
                color: '#222',
                fontWeight: 400,
              }}
              disabled={loading || waitingForSystemPrompt}
            />
            <button type="submit" style={{
              padding: '0 16px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              cursor: loading || waitingForSystemPrompt ? 'not-allowed' : 'pointer',
            }} disabled={loading || waitingForSystemPrompt}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;