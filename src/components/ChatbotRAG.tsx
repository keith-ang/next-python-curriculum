import React from 'react';
import { useChat } from "ai/react";
import { Message } from "ai";
import Bubble from './Bubble';
import LoadingBubble from './LoadingBubble';
import PromptSuggestionRow from './PromptSuggestionRow';
import CustomTextArea from './CustomTextArea';
import styles from './ChatbotRAG.module.css';

const ChatbotRAG: React.FC = () => {
    const { append, isLoading, messages, input, handleInputChange, handleSubmit } = useChat();

    const noMessages = !messages || messages.length === 0;

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Corrected type casting
        }
    };

    const handlePrompt = (promptText: string) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user"
        };
        append(msg);
    };

    return (
        <main className={styles.chatbot}>
            <section className={noMessages ? styles.empty : styles.populated}>
                {noMessages ? (
                    <>
                        <p className={styles.starterText}>
                            Ask me a question!
                        </p>
                        <br />
                        <PromptSuggestionRow onPromptClick={handlePrompt} />
                    </>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <Bubble key={`message-${index}`} message={message} />
                        ))}
                        {isLoading && <LoadingBubble />}
                    </>
                )}
            </section>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <CustomTextArea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me something"
                    onKeyPress={handleKeyPress}
                />
                <button type="submit" className={styles.submitButton}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={styles.submitIcon}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l9-9m0 0l9 9m-9-9v18" />
                    </svg>
                </button>
              </div>
            </form>
        </main>
    );
};

export default ChatbotRAG;