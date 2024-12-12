# RAG Chatbot Setup Instructions

## Overview

This project aims to set up and integrate a Retrieval-Augmented Generation (RAG) chatbot using OpenAI's models and ChromaDB for document embedding and retrieval, within a Python curriculum web application. This chatbot is designed to assist students by providing relevant information and answering questions related to the curriculum.

## Features
- RAG Chatbot: Employs OpenAI's models combined with ChromaDB for effective document retrieval and generation of responses.
- Python Curriculum:  A comprehensive web application designed to teach and support learning Python, dynamically rendered from JSON files.
- Student Assistance: The integrated chatbot helps students by retrieving relevant information and answering curriculum-related queries.

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- ChromaDB

### Environment Variables

Create a `.env` file at the root of your project and fill in the required environment variables as follows:
```sh
    NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
    NEXT_PUBLIC_PYTHON_EDITOR_URL=<your-python-editor-url>
    NEXT_PUBLIC_LANGUAGE=en-US

    DOCUMENTS_FOLDER=<filepath-of-your-documents-to-RAG>

    OPENAI_API_KEY=<your-openai-api-key>
    OPENAI_EMBEDDING_MODEL=text-embedding-3-small # or your preferred embedding model
    OPENAI_CHAT_MODEL=gpt-4o # or your preferred chat model

    CHROMA_DATABASE_URL=http://localhost:8000 # it runs on port 8000 by default
    CHROMA_COLLECTION_NAME=documents # or your preferred collection name 

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
This command creates a directory `chromadb` in your root directory, but you can change it to any other filepath. Make sure ChromaDB is running on the specified `CHROMA_DATABASE_URL`.

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
    ├── src
    │   ├── components
    │   │   └── ...
    │   ├── pages
    │   │   └── ...
    │   └── ...
    ├── package.json
    └── ...
```

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

## Troubleshooting
- ChromaDB Issues: Ensure ChromaDB is running properly and the URL is correct in the .env file.
- OpenAI API Issues: Verify that your OpenAI API key is correct and has sufficient quota.
- Dependency Issues: Ensure all dependencies are installed correctly and the versions match the prerequisites.