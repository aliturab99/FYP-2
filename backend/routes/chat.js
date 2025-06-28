const express = require('express');
const router = express.Router();

// This is a placeholder for chat functionality
// You can integrate with OpenAI, Google AI, or other AI services

// POST /api/chat - Handle chat messages
router.post('/', async (req, res) => {
  try {
    const { message, userId = 'anonymous' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Basic medical responses (you can expand this or integrate with AI)
    const responses = {
      greeting: [
        "Hello! I'm your medical assistant. How can I help you today?",
        "Hi there! I'm here to help with your medical questions.",
        "Welcome to MedMagic! How can I assist you with your health needs?"
      ],
      symptoms: [
        "I understand you're experiencing symptoms. For serious concerns, please consult a healthcare professional immediately.",
        "While I can provide general information, it's important to seek medical advice for proper diagnosis and treatment.",
        "For any urgent symptoms, please contact your doctor or emergency services."
      ],
      medications: [
        "I can help you find medications in our store. What specific medication are you looking for?",
        "For medication information, always consult your pharmacist or doctor for proper dosage and usage.",
        "You can browse our medications category in the store for available options."
      ],
      general: [
        "I'm here to help with medical information and guide you through our store.",
        "Feel free to ask about our products or general health information.",
        "How can I assist you with your medical needs today?"
      ]
    };

    // Simple keyword-based response system
    const lowerMessage = message.toLowerCase();
    let responseType = 'general';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      responseType = 'greeting';
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('fever') || lowerMessage.includes('sick') || lowerMessage.includes('symptom')) {
      responseType = 'symptoms';
    } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('pill')) {
      responseType = 'medications';
    }

    const responseOptions = responses[responseType];
    const response = responseOptions[Math.floor(Math.random() * responseOptions.length)];

    // Log the conversation (in a real app, you might want to store this)
    console.log(`Chat - User: ${message} | Bot: ${response}`);

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
      messageId: Date.now().toString()
    });

  } catch (error) {
    res.status(500).json({ error: 'Chat service temporarily unavailable', details: error.message });
  }
});

// GET /api/chat/health - Health check for chat service
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'MedMagic Chat Bot',
    capabilities: [
      'General medical information',
      'Product recommendations',
      'Store navigation help',
      'Basic health guidance'
    ],
    disclaimer: 'This chat bot provides general information only and is not a substitute for professional medical advice.'
  });
});

// POST /api/chat/feedback - Collect chat feedback
router.post('/feedback', async (req, res) => {
  try {
    const { messageId, rating, feedback, userId = 'anonymous' } = req.body;

    // In a real app, you'd store this feedback in a database
    console.log('Chat Feedback:', { messageId, rating, feedback, userId, timestamp: new Date() });

    res.json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback', details: error.message });
  }
});

module.exports = router;
