import React, { useRef, useEffect } from 'react';
import styles from './ChatbotRAG.module.css';

interface CustomTextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; // Add onKeyPress prop
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ value, onChange, placeholder, onKeyPress }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress} // Attach the key press handler
            placeholder={placeholder}
            rows={1}
            className={styles.customTextarea}
            />
    );
};

export default CustomTextArea;