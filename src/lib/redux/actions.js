export const setDays = (days) => ({
  type: 'days/setDays',
  payload: days,
});

export const setFilename = (filename) => ({
  type: 'filename/setFilename',
  payload: filename,
});

export const clearFilename = () => ({
  type: 'filename/clearFilename',
});

export const toggleChatbotVisibility = () => ({
  type: 'chatbotVisibility/toggleChatbotVisibility',
});

export const setChatMessages = (messages) => ({
  type: 'chatMessages/setChatMessages',
  payload: messages,
});

export const appendChatMessage = (message) => ({
  type: 'chatMessages/appendChatMessage',
  payload: message,
});

export const clearChatMessages = () => ({
  type: 'chatMessages/clearChatMessages',
})

export const setPopupSize = (size) => ({
  type: 'popupSize/setPopupSize',
  payload: size,
});