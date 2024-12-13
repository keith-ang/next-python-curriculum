# RAG Chatbot Setup Instructions

## Overview

This project aims to set up and integrate a Retrieval-Augmented Generation (RAG) chatbot using OpenAI's models and ChromaDB for document embedding and retrieval, within a Python curriculum web application. This chatbot is designed to assist students by providing relevant information and answering questions related to the curriculum.

## Features
- **Configurable LLM Chat Service Provider**: The chatbot can use OpenAI, Azure OpenAI, or OpenRouter for generating chat responses.
- **OpenAI for Embeddings**: The embeddings used for document retrieval are generated using OpenAI's embedding services exclusively.
- **Python Curriculum**: A comprehensive web application designed to teach and support learning Python, dynamically rendered from JSON files. The Python curriculum is adapted from [30-Days-Of-Python](https://github.com/Asabeneh/30-Days-Of-Python) by Asabeneh Yetayeh.
- **Student Assistance**: The integrated chatbot helps students by retrieving relevant information and answering curriculum-related queries.

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- ChromaDB

### Environment Variables

Create a `.env` file at the root of your project and fill in the required environment variables as follows. Note that you only need to fill in the API keys and details for the service provider you intend to use, which should match the `SERVICE_PROVIDER` environment variable.
```sh
# Set the service provider for generating chat responses; options are "openai", "azure_openai", or "openrouter"
SERVICE_PROVIDER=openai

# Set up OpenAI API details
OPENAI_API_KEY=<your-openai-api-key>
OPENAI_EMBEDDING_MODEL=text-embedding-3-small # or your preferred embedding model
OPENAI_CHAT_MODEL=gpt-4 # or your preferred chat model

# Set up Azure OpenAI API details
AZURE_OPENAI_API_KEY=<your-azure-openai-api-key>
AZURE_OPENAI_API_INSTANCE_NAME=<your-azure-openai-api-instance-name>
AZURE_OPENAI_API_VERSION=<your-azure-openai-api-version>
AZURE_OPENAI_CHAT_MODEL=gpt-3.5-turbo # or your preferred chat model for Azure

# Set up OpenRouter API details
OPENROUTER_API_KEY=<your-openrouter-api-key>
OPENROUTER_CHAT_MODEL=openai/gpt-3.5-turbo # or your preferred chat model for OpenRouter

NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000 # or replace with your server URL
NEXT_PUBLIC_PYTHON_EDITOR_URL=<your-python-editor-url>
NEXT_PUBLIC_LANGUAGE=en-US

DOCUMENTS_FOLDER=<filepath-of-your-documents-to-RAG>

# Set up ChromaDB details
CHROMA_DATABASE_URL=http://localhost:8000 # runs on port 8000 by default
CHROMA_COLLECTION_NAME=documents # or your preferred collection name 

# Specify chunk size and overlap for document processing
CHUNK_SIZE=1024 # change accordingly
CHUNK_OVERLAP=100 # change accordingly
```

### Install Dependencies

Run the following command to install the project's dependencies:

```bash
npm install
```

### Running ChromaDB Locally
Open another terminal and run the following command if you do not have ChromaDB installed on your system:

```sh
pip install chromadb
```

Set up ChromaDB locally with the following command:

```bash
chroma run --path ./chromadb
```
This command creates a directory `chromadb` in your root directory but you can change it to whatever you like, and also a subdirectory called the value specified in the `CHROMA_COLLECTION_NAME` environment variable. Make sure ChromaDB is running on the specified `CHROMA_DATABASE_URL`.

### Run Scripts
1. seed

This command seeds the ChromaDB with document embeddings. It will load all the files from the `DOCUMENTS_FOLDER` specified in your `.env` file.

```bash
npm run seed
```

2. build

This command builds the project for deployment.

```bash
npm run build
```
3. dev

This command runs the project in development mode.

```bash
npm run dev
```

## Project Structure
```plaintext
    ├── .env
    ├── chromadb
    ├── files_to_rag
    │   ├── doc1.md
    │   ├── doc2.json
    |   ├── doc3.pdf
    │   └── ...
    ├── public
    │   ├── json_files
    │   │   ├── curriculum1.json
    │   │   ├── curriculum2.json
    │   │   └── ...
    |   ├── images
    │   │   ├── img1.jpg
    │   │   └── ...
    ├── src
    │   ├── components
    │   │   └── ...
    │   ├── pages
    │   │   └── ...
    │   └── ...
    ├── package.json
    └── ...
```

## How the Chatbot Works

### `/api/chat` Endpoint

The chatbot interacts with users via the `/api/chat` endpoint, which processes user messages, fetches relevant document context, and generates responses using an LLM service provider.

#### index.ts
The handler function processes incoming requests and generates chat responses. It performs the following steps:

1. Determine the Service Provider: Reads the `SERVICE_PROVIDER` environment variable to determine which LLM service provider to use (`openai`, `azure_openai`, or `openrouter`).
2. Receive and Validate Messages: Processes and validates incoming messages to ensure the last message is from the user and is in the correct format.
3. Fetch Document Context: Retrieves relevant document context from ChromaDB based on the user query.
4. Generate Template: Creates a message template incorporating the document context.
5. Call LLM: Calls the appropriate LLM service provider to generate a response.
6. Stream Response: Streams the generated response back to the user.

## Explanation of RAG (Retrieval-Augmented Generation) Process
The Retrieval-Augmented Generation (RAG) chatbot integrates document retrieval and response generation using ChromaDB and a configurable LLM service provider.

### Seeding ChromaDB with Documents
The `npm run seed` command seeds ChromaDB with document embeddings. This command calls `./src/scripts/embedDocuments.ts`, which performs the following steps:

1. Read Documents: Reads all documents from the directory specified by the `DOCUMENTS_FOLDER` environment variable.
2. Chunk Documents: Splits the documents into manageable chunks using the specified chunk size and overlap.
3. Embed and Upsert Documents: Embeds the document chunks and upserts them into ChromaDB.

### `/api/chroma` Endpoint
The `/api/chroma` endpoint handles document querying and retrieval from ChromaDB. It processes the user query, retrieves relevant documents, and returns them as a response.

1. Initialize ChromaDB: Connect to ChromaDB using the specified database URL.
2. Receive and Process Query: Accept the user query from the request body.
3. Query ChromaDB: Search the database for relevant documents based on the query text.
4. Return Documents: Return the retrieved documents as a JSON response.

## Rendering Python Curriculum
The Python curriculum is dynamically rendered from JSON files located in the `/public/json_files` directory. Each JSON file represents a portion of the curriculum, catering to different topics or levels. These files are loaded by the web application to display relevant content and structure, making it easy to update and extend the curriculum.

### Including Images in JSON Files
If you want to include images in the JSON files, you should place these images in the `/public/images` directory. You can reference these images in your JSON files using the appropriate relative paths.

### Example JSON File Structure
Here's an example JSON file (curriculum1.json) to illustrate how the curriculum is structured:
```json
{
    "day": 2,
    "title": "Variables, Builtin Functions",
    "content": {
        "tag": "root",
        "children": [
            {
                "type": "Element",
                "tagName": "h1",
                "attributes": {},
                "children": [
                    {
                        "type": "Text",
                        "content": "Day 2 - Variables, Builtin Functions"
                    }
                ]
            },
            {
                "type": "Element",
                "tagName": "p",
                "attributes": {},
                "children": [
                    {
                        "type": "Element",
                        "tagName": "img",
                        "attributes": {
                            "alt": "30DaysOfPython",
                            "src": "../images/30DaysOfPython_banner3@2x.png"
                        }
                    }
                ]
            }
        ]
    }
}
```

## Scaling the Project to Any Application
This project can be scaled to any application that aims to dynamically render content and integrate a Retrieval-Augmented Generation (RAG) chatbot. Here are the key steps to achieve this:

### Steps to Scale the Project
1. Define the Content Structure:
    - Determine the structure of your content in JSON files.
    - Ensure that JSON files match the format provided in the section above. This format is structured to be easily converted from HTML to JSON, similar to npm packages that facilitate such conversions.

2. Set Up ChromaDB:
    - Use ChromaDB to manage and query your documents. Follow the setup steps in this project to install and run ChromaDB locally or deploy it on a server.
    - Utilize the `initialiseDb.ts` and `embedDocuments.ts` scripts to manage the document embedding and retrieval process.
    
3. Configure LLM Service Providers:
    - Choose the LLM service providers you want to use for generating chat responses (OpenAI, Azure OpenAI, or OpenRouter).

4. Set up the necessary environment variables to configure the service providers. Ensure that the `SERVICE_PROVIDER` environment variable matches the provided API keys and details.

5. Implement the Chatbot:
    - Implement the necessary API endpoints such as `/api/chat` and `/api/chroma` to handle user queries and document retrieval.
    - Use the `index.ts` and `llm.ts` files as templates to process user messages, fetch relevant document context, and generate responses using the chosen LLM service provider.

6. Embed and Upsert Documents:
    - Use the embedDocuments.ts script to read, chunk, and embed documents from your content directory. Upsert the embedded document chunks into ChromaDB to make them available for querying.

## Troubleshooting
- ChromaDB Issues: Ensure ChromaDB is running properly and the URL is correct in the .env file.
- OpenAI API Issues: Verify that your OpenAI API key is correct and has sufficient quota.
- Dependency Issues: Ensure all dependencies are installed correctly and the versions match the prerequisites.