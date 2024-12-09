import React from 'react';

const PythonEditor = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        title='Python Editor'
        src={process.env.NEXT_PUBLIC_PYTHON_EDITOR_URL} // Change URL to the specific Repl.it you want to embed
        style={{ width: '100%', height: '100%' }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
      >
      </iframe>
    </div>
  );
};

export default PythonEditor;