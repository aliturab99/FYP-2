import { openai } from 'ai'; // Or import { google } from 'ai/google'; for Gemini
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'), // Or google('models/gemini-1.5-pro-latest') for Gemini
    messages,
  });

  return result.toAIStreamResponse();
}