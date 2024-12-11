//actions.js
export const setDays = (days) => ({
  type: 'SET_DAYS',
  payload: days,
});

export const setFilename = (filename) => ({
  type: 'SET_FILENAME',
  payload: filename,
});

export const toggleChatbotVisibility = () => ({
  type: 'chatbotVisibility/toggleChatbotVisibility'
});