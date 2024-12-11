import React from 'react';
import PromptSuggestionButton from './PromptSuggestionButton';
import styles from './ChatbotRAG.module.css';

interface PromptSuggestionRowProps {
    onPromptClick: (prompt: string) => void;
}

const PromptSuggestionRow: React.FC<PromptSuggestionRowProps> = ({ onPromptClick }) => {
    const prompts = [
        "What is a list in Python?",
        "What is Python mainly used for?",
        "What is the latest version of Python?"
    ];

    return (
        <div className={styles.PromptSuggestionRow}>
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton 
                    key={`suggestion-${index}`}
                    text={prompt}
                    onClick={() => onPromptClick(prompt)}
                />
            ))}
        </div>
    );
};

export default PromptSuggestionRow;