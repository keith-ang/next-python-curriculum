export const runtime = 'edge';  // This ensures the route uses the Edge runtime environment

import { StreamingTextResponse, OpenAIStream } from 'ai';
import { createTemplate } from '@/templates/systemPrompt';
import { NextResponse } from 'next/server';
import { callLLM } from './llm';

async function handler(req: Request) {
  const serviceProvider = process.env.SERVICE_PROVIDER;
  console.log(`Service provider: ${serviceProvider}`);

  const clientUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/chroma`
    : null;

  if (!clientUrl) {
    console.error('NEXT_PUBLIC_FRONTEND_URL is not defined in environment variables.');
    return NextResponse.json({ error: 'Required environment variables not defined' }, { status: 500 });
  }

  let chatModel;

  try {
    if (!serviceProvider) {
      throw new Error('SERVICE_PROVIDER is not defined in environment variables.');
    }

    if (serviceProvider === 'openai') {
      chatModel = process.env.OPENAI_CHAT_MODEL || 'gpt-3.5-turbo';  // Default model
    } else if (serviceProvider === 'azure_openai') {
      chatModel = process.env.AZURE_OPENAI_CHAT_MODEL || 'gpt-3.5-turbo';  // Default model
    } else if (serviceProvider === 'openrouter') {
      chatModel = process.env.OPENROUTER_CHAT_MODEL || 'openai/gpt-3.5-turbo';  // Default model
    } else {
      throw new Error('Unsupported service provider');
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occurred');
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }

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
    console.log(`Message sent to LLM: ${template.content}`);

    const response = await callLLM({
      messages: messages.slice(-10),   // keep short term memory to last 10 messages
      serviceProvider, 
      template,
      chatModel
    });

    let stream;
    if (serviceProvider === 'openrouter') {
      // Convert the OpenRouter response to a ReadableStream
      const messageContent = response.choices[0].message.content;
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(messageContent));
          controller.close();
        }
      });
      stream = readableStream;
    } else {
      stream = OpenAIStream(response);
    }

    return new StreamingTextResponse(stream);

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error('Unknown error occurred');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}

export default handler;