import React from "react";

const Popup = ({ title, children, onClose }) => {
  return (
    <div className="popup">
      <div className={`popup__content ${!title ? "popup__photo-content" : ""}`}>
        <button className="popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
