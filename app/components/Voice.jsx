'use client';

import { useState, useEffect, useCallback } from 'react';

const VoiceController = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commands, setCommands] = useState({});
  const [feedback, setFeedback] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setFeedback('Speech recognition not supported in this browser');
        return;
      }

      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript.trim();
        setTranscript(text);
        
        // Check if the transcript matches any command
        Object.entries(commands).forEach(([command, action]) => {
          if (text.toLowerCase().includes(command.toLowerCase())) {
            action();
            setFeedback(`Executed: ${command}`);
          }
        });
      };

      recognitionInstance.onerror = (event) => {
        setFeedback(`Error: ${event.error}`);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [commands]);

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setFeedback('Voice control stopped');
      } else {
        recognition.start();
        setFeedback('Listening... Say a command');
      }
      setIsListening(!isListening);
    }
  }, [isListening, recognition]);

  // Add a new voice command
  const addCommand = useCallback((command, action) => {
    setCommands(prev => ({ ...prev, [command]: action }));
  }, []);

  useEffect(() => {
    addCommand('home', () => {
      window.location.href = '/';
    });
    
    addCommand('store', () => {
      window.location.href = '/store';
    });

    addCommand('about', () => {
        window.location.href = '/about';
    });
    addCommand('contact', () => {
        window.location.href = '/contact';
    });
    addCommand('FAQ', () => {
        window.location.href = '/FAQ';
    });
    addCommand('appointment', () => {
        window.location.href = '/appointments';
    });
    addCommand('take quiz', () => {
        window.location.href = '/quiz';
    });
    addCommand('dark mode', () => {
      document.documentElement.classList.add('dark');
    });
    
    addCommand('light mode', () => {
      document.documentElement.classList.remove('dark');
    });
  }, [addCommand]);

  return (
    <div className="fixed bottom-4 right-4 mb-7">
      <div className="bg-[#1a1a1a] dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-[50dvh] animate-pulse">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500'} text-white`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
        
        <div className="mt-2 text-sm">
          {feedback && <p className="text-gray-700 dark:text-gray-300">{feedback}</p>}
          {transcript && <p className="text-gray-500 dark:text-gray-400">Heard: "{transcript}"</p>}
        </div>
      </div>
    </div>
  );
};

export default VoiceController;