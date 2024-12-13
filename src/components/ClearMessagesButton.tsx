import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearChatMessages } from '../lib/redux/reducers';
import { useChat } from 'ai/react';
import styles from './ClearMessagesButton.module.css';  // Import the CSS module

const ClearMessagesButton: React.FC = () => {
    const dispatch = useDispatch();
    const { setMessages } = useChat();
    const [showDialog, setShowDialog] = useState(false);
  
    const handleClearMessages = () => {
      setMessages([]);  // Clear messages in the local chat state
      localStorage.setItem('chatMessages', JSON.stringify([]));  // Clear messages in localStorage
      dispatch(clearChatMessages());  // Dispatch action to clear messages in Redux store
      setShowDialog(false);
    };
  
    const openDialog = () => {
      setShowDialog(true);
    };
  
    const closeDialog = () => {
      setShowDialog(false);
    };
  return (
        <>
            <button onClick={openDialog} className={styles.clearButton} aria-label="Clear Chat Messages">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width="20"
                    height="20"
                    viewBox="0 0 2048 2048"
                    style={{
                    shapeRendering: 'geometricPrecision',
                    textRendering: 'geometricPrecision',
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    }}
                >
                    <defs>
                    <style>{'.fil0{fill:#ff0000;fill-rule:nonzero}'}</style>
                    </defs>
                    <g id="Layer_x0020_1">
                    <path
                        className="fil0"
                        d="M498.972 597.116h1050.08c17.673 0 32 14.328 32 32 0 1.91-.167 3.78-.487 5.598l-120.927 1128.66-31.75-3.376 31.817 3.41c-1.765 16.493-15.773 28.712-32.018 28.591H620.114c-17.236 0-31.288-13.629-31.973-30.695l-120.94-1128.79-.07.007c-1.88-17.572 10.838-33.345 28.41-35.227a32.082 32.082 0 013.432-.183zm1014.54 64.002H534.49l114.307 1066.88h750.408l114.307-1066.88zM1173.77 424.356c-2 17.535 10.591 33.374 28.126 35.375 17.534 2.001 33.374-10.59 35.375-28.125.312-2.666.57-5.684.77-9.063.223-3.814.34-6.885.34-9.158v-.003c0-43.313-17.698-82.667-46.207-111.176-28.51-28.51-67.864-46.207-111.177-46.207H967.01c-43.313 0-82.668 17.698-111.177 46.207-28.51 28.509-46.207 67.863-46.207 111.176v.003c0 2.273.117 5.344.34 9.158.2 3.38.458 6.397.77 9.063 2 17.534 17.84 30.126 35.375 28.125 17.535-2 30.127-17.84 28.126-35.375-.254-2.17-.43-4.032-.52-5.564-.059-1.005-.09-2.792-.09-5.407v-.003c0-25.646 10.517-48.987 27.456-65.925 16.94-16.94 40.28-27.456 65.927-27.456h113.986c25.648 0 48.988 10.516 65.927 27.456 16.94 16.938 27.456 40.279 27.456 65.925v.003c0 2.615-.03 4.402-.09 5.407-.09 1.532-.266 3.394-.52 5.564z"
                    />
                    <path
                        className="fil0"
                        d="M771.011 917.357c-1.656-17.535-17.216-30.406-34.75-28.75-17.535 1.656-30.407 17.215-28.75 34.75l62.601 646.902c1.656 17.535 17.216 30.406 34.75 28.75 17.535-1.656 30.407-17.215 28.751-34.75l-62.602-646.902zM1340.49 923.357c1.656-17.535-11.216-33.094-28.75-34.75-17.535-1.656-33.095 11.215-34.75 28.75l-62.602 646.902c-1.656 17.535 11.216 33.094 28.75 34.75 17.536 1.656 33.095-11.215 34.751-28.75l62.601-646.902zM1056 903.519c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v663.74c0 17.673 14.328 32 32.001 32s32.001-14.327 32.001-32v-663.74zM456.031 597.116h1135.94l53.732-127.154h-1243.4l53.73 127.154zm1157.02 64.002H435.631c-12.72.268-24.908-7.113-30.162-19.545l29.477-12.456-29.375 12.375-79.644-188.477a31.861 31.861 0 01-3.757-15.054c0-17.673 14.328-32 32-32h1339.05c4.351-.086 8.791.72 13.059 2.523 16.279 6.88 23.9 25.654 17.02 41.933l-.114-.048-79.648 188.484c-4.12 12.913-16.213 22.265-30.491 22.265z"
                    />
                    </g>
                    <path style={{ fill: 'none' }} d="M0 0h2048v2048H0z" />
                </svg>
                Clear Chat
            </button>

            {showDialog && (
            <>
            <div className={styles.dialogOverlay} onClick={closeDialog}></div>
            <div className={styles.confirmationDialog}>
                <p>Are you sure you want to clear the chat?</p>
                <div className={styles.dialogButtonContainer}>
                    <button className={`${styles.dialogButton} ${styles.confirmButton}`} onClick={handleClearMessages}>Clear Chat</button>
                    <button className={`${styles.dialogButton} ${styles.cancelButton}`} onClick={closeDialog}>Cancel</button>
                </div>
            </div>
            </>
            )}
        </>
  );
};

export default ClearMessagesButton;