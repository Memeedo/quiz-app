import React from 'react';
import './Progressbar.css';

// A simple progress bar component that receives 'progress' as a prop
function Progressbar({ progress }) {
  return (
    <div className="progressbar-container">
      <div className="progressbar">
        <div
          className="progressbar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{progress}% Completed</p>
    </div>
  );
}

export default Progressbar;
