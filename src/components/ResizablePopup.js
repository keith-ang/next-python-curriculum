import React, { useEffect } from "react";
import { Resizable } from "re-resizable";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatbotVisibility, setPopupSize } from "../lib/redux/actions";
import styles from "./ResizablePopup.module.css";

const ResizablePopup = ({ component: Component, title = "Chat" }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.chatbotVisibility);
  const size = useSelector((state) => state.popupSize);

  // Load size from localStorage on component mount
  useEffect(() => {
    const width = localStorage.getItem("popupWidth");
    const height = localStorage.getItem("popupHeight");
    if (width && height) {
      dispatch(setPopupSize({ width: parseInt(width), height: parseInt(height) }));
    }
  }, [dispatch]);

  const toggleVisibility = () => {
    dispatch(toggleChatbotVisibility());
  };

  const handleResizeStop = (e, direction, ref, d) => {
    const newWidth = size.width + d.width;
    const newHeight = size.height + d.height;
    dispatch(setPopupSize({ width: newWidth, height: newHeight }));

    // Save new dimensions to localStorage
    localStorage.setItem("popupWidth", newWidth.toString());
    localStorage.setItem("popupHeight", newHeight.toString());
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
          size={size}
          onResizeStop={handleResizeStop}
          minWidth={600}
          minHeight={300}
          maxWidth={1200}
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