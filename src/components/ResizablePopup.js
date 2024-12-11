//ResizablePopup.js
import React from "react";
import { Resizable } from "re-resizable";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatbotVisibility } from "../lib/redux/actions";
import styles from "./ResizablePopup.module.css";

const ResizablePopup = ({ component: Component, title = "Chat" }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.chatbotVisibility);

  const toggleVisibility = () => {
    dispatch(toggleChatbotVisibility());
  };

  return (
    <div className={styles.popupWrapper}>
      {!isVisible && (
        <button onClick={toggleVisibility} className={styles.toggleButton}>
          {title}
        </button>
      )}
      {isVisible && (
        <Resizable
          defaultSize={{
            width: 320,
            height: 480,
          }}
          minWidth={600}
          minHeight={300}
          maxWidth={1000}
          maxHeight={600}
          className={styles.resizableContainer}
        >
          <div className={styles.header}>
            <button onClick={toggleVisibility} className={styles.closeButton}>
              &times;
            </button>
          </div>
          <Component />
        </Resizable>
      )}
    </div>
  );
};

export default ResizablePopup;