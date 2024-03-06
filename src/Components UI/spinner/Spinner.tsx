import React from 'react';

export default function Spinner() {
  return (
    <div className="overlay">
      <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
