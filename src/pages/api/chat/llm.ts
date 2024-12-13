import { OpenAI, AzureOpenAI } from 'openai';

interface LLMConfig {
  messages: any[];
  serviceProvider: string;
  template: any;
  chatModel: string;
}

export async function callLLM({ messages, serviceProvider, template, chatModel }: LLMConfig) {
  switch (serviceProvider) {
    case 'openai':
      const openAiApiKey = process.env.OPENAI_API_KEY;

      if (!openAiApiKey) {
        console.error('OPENAI_API_KEY is not defined in environment variables.');
        throw new Error('Required environment variables not defined');
      }

      const openai = new OpenAI({ apiKey: openAiApiKey });
      return openai.chat.completions.create({
        model: chatModel,
        stream: true,
        messages: [template, ...messages],
      });

    case 'azure_openai':
      const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
      const apiEndpoint = process.env.AZURE_OPENAI_API_ENDPOINT;
      const apiVersion = process.env.AZURE_OPENAI_CHAT_API_VERSION;
      const deploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;

      if (!azureApiKey || !apiEndpoint || !apiVersion || !deploymentName) {
        console.error('One or more Azure OpenAI environment variables are not defined.');
        throw new Error('Required environment variables not defined');
      }

      const azureOpenAi = new AzureOpenAI({
        apiKey: azureApiKey,
        apiVersion,
        endpoint: apiEndpoint,
        deployment: deploymentName,
      });

      return azureOpenAi.chat.completions.create({
        model: chatModel,
        stream: true,
        messages: [template, ...messages],
      });

    case 'openrouter':
      const openRouterApiKey = process.env.OPENROUTER_API_KEY;
      

      if (!openRouterApiKey) {
        console.error('OPENROUTER_API_KEY is not defined in environment variables.');
        throw new Error('Required environment variables not defined');
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: chatModel,
          messages: [template, ...messages],
        }),
      });

      if (!response.ok) {
        throw new Error('Error calling OpenRouter API');
      }

      return response.json();
      
    default:
      throw new Error('Unsupported service provider');
  }
}