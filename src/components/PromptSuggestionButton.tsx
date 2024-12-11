import React from 'react';
import styles from './ChatbotRAG.module.css';

interface PromptSuggestionButtonProps {
    text: string;
    onClick: () => void;
}

const PromptSuggestionButton: React.FC<PromptSuggestionButtonProps> = ({ text, onClick }) => {
    return (
        <button 
            className={styles.promptSuggestionButton}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default PromptSuggestionButton;