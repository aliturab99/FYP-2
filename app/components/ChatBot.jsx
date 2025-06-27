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
        onClick={toggleChatbotVisibility}
        className='fixed bottom-10 right-5 animate-pulse rounded-full bg-[#2563eb] text-white p-4 cursor-pointer shadow-lg hover:shadow-xl transition-shadow'
      >
        Chat
      </div>

      {isChatbotVisible && (
        <div
          className="fixed bottom-20 right-5 z-[999] w-[350px] max-w-[95vw] h-[480px] max-h-[80vh] bg-[#18181b] rounded-xl shadow-xl flex flex-col overflow-hidden border border-[#23232a]"
        >
          <div className="bg-[#23232a] text-white px-4 py-3 font-semibold text-base border-b border-[#23232a] text-center tracking-wide relative">
            Medical Assistant
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 text-lg font-bold p-1 rounded transition-colors"
              onClick={() => setIsChatbotVisible(false)}
              aria-label="Close chat"
              type="button"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-[#18181b]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && msg.isHtml ? (
                  <span className="inline-block bg-[#23232a] text-white rounded-lg px-3 py-2 max-w-[80%] text-sm" dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  <span className={`inline-block rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-[#2563eb] text-white' : 'bg-[#23232a] text-white'}`}>{msg.text}</span>
                )}
              </div>
            ))}
            {(loading || waitingForSystemPrompt) && <div className="text-[#2563eb] text-center mt-4 font-medium text-sm">Gemini is preparing your medical assistant...</div>}
          </div>
          <form onSubmit={sendMessage} className="flex border-t border-[#23232a] bg-[#18181b] p-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={waitingForSystemPrompt ? "Please wait..." : "Type your message..."}
              className="flex-1 px-3 py-2 border border-[#23232a] outline-none rounded-md text-sm bg-[#23232a] mr-2 text-white font-normal"
              disabled={loading || waitingForSystemPrompt}
            />
            <button type="submit" className="px-4 bg-[#2563eb] text-white border-none rounded-md font-semibold text-sm disabled:opacity-60" disabled={loading || waitingForSystemPrompt}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;