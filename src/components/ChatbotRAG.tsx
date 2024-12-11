import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from "ai/react";
import { Message } from "ai";
import Bubble from './Bubble';
import LoadingBubble from './LoadingBubble';
import PromptSuggestionRow from './PromptSuggestionRow';
import CustomTextArea from './CustomTextArea';
import { setChatMessages, appendChatMessage } from '../lib/redux/actions';
import styles from './ChatbotRAG.module.css';

const ChatbotRAG: React.FC = () => {
    const dispatch = useDispatch();
    const reduxMessages: Message[] = useSelector((state: any) => state.chatMessages);
    const { append, isLoading, input, handleInputChange, handleSubmit, messages, setMessages } = useChat();

    const [initialMessagesLoaded, setInitialMessagesLoaded] = React.useState(false);

    // Load messages from local storage on component mount
    useEffect(() => {
        const storedMessages: Message[] = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        setMessages(storedMessages); // Initialize messages in the useChat hook
        dispatch(setChatMessages(storedMessages)); // Initialize messages in Redux
        setInitialMessagesLoaded(true);
    }, [dispatch, setMessages]);

    // Save messages to local storage whenever they change
    useEffect(() => {
        if (initialMessagesLoaded) {
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages, initialMessagesLoaded]);

    const noMessages = !messages || messages.length === 0;

    // Synchronize message appending with Redux and the useChat hook
    const appendMessage = (msg: Message) => {
        dispatch(appendChatMessage(msg));
        append(msg);
    };

    const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            customHandleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    const handlePrompt = (promptText: string) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: 'user'
        };
        appendMessage(msg);
    };

    return (
        <main className={styles.chatbot}>
            <section className={noMessages ? styles.empty : styles.populated}>
                {noMessages ? (
                    <>
                        <p className={styles.starterText}>Ask me a question!</p>
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
            <form className={styles.form} onSubmit={customHandleSubmit}>
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