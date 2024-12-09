// SpeechButton.js
import React from 'react';
import PropTypes from 'prop-types';

const SpeechButton = ({ text }) => {
    const speak = () => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = `${process.env.NEXT_PUBLIC_LANGUAGE}`; // Set the language, you can customize this
        speech.rate = 1; // Set the rate of speech
        speech.pitch = 1; // Set the pitch
        speech.volume = 1; // Set the volume
        window.speechSynthesis.speak(speech);
      };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#bbbfc5', 
  };

  const iconStyle = {
    fontSize: '1.2em'
  };

  return (
    <button onClick={speak} style={buttonStyle}>
      <i className="fa fa-volume-up" style={iconStyle}></i>
    </button>
  );
};

SpeechButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SpeechButton;