import React from 'react';
import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import styles from './ChatbotRAG.module.css';

interface BubbleProps {
    message: Message;
}

const Bubble: React.FC<BubbleProps> = ({ message }) => {
    const { content, role } = message;

    return (
        <div className={`${styles.bubble} ${role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}`}>
            {role === 'assistant' ? (
                <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
                content
            )}
        </div>
    );
};

export default Bubble;