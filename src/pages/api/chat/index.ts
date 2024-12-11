export const runtime = 'edge'; // This ensures the route uses the Edge runtime environment

import { StreamingTextResponse, OpenAIStream } from 'ai';
import OpenAI from 'openai';
import { createTemplate } from '@/templates/systemPrompt';
import { NextResponse } from 'next/server';

async function handler(req: Request) {
  console.log('API request received');
  const apiKey = process.env.OPENAI_API_KEY;
  const chatModel = process.env.OPENAI_CHAT_MODEL || 'gpt-3.5-turbo'; // default model
  const clientUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/chroma`;

  if (!apiKey || !clientUrl) {
    console.error('OPENAI_API_KEY or CHROMA_DATABASE_URL is not defined in environment variables.');
    return NextResponse.json({ error: 'Required environment variables not defined' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey: apiKey });

  try {
    const { messages } = await req.json();
    const lastMessageObject = messages[messages.length - 1];

    if (typeof lastMessageObject?.content !== 'string' || lastMessageObject.role !== 'user') {
      throw new Error('Invalid message format or non-user message');
    }

    const lastMessage = lastMessageObject.content;

    console.log('Received messages:', JSON.stringify(messages, null, 2));

    let docContext = '';
    try {
      const response = await fetch(clientUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryText: lastMessage }),
      });

      if (!response.ok) {
        throw new Error('Error fetching document context from Chroma API');
      }

      const data = await response.json();
      docContext = JSON.stringify(data.documents);
    } catch (err) {
      console.error('Error querying the Chroma API:', err);
      docContext = '';
    }

    const template = createTemplate({ docContext, userMessage: lastMessage });
    console.log(`Message sent to OpenAI: ${template.content}`);

    const response = await openai.chat.completions.create({
      model: chatModel,
      stream: true,
      messages: [template, ...messages],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export default handler;