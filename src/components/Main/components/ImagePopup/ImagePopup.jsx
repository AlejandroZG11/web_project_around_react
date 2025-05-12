import React from "react";

const ImagePopup = ({ title, link, alt }) => {
  return (
    <div className="popup__image-container">
      <img className="popup__image" src={link} alt={alt} />
      <p className="popup__image-caption">{title}</p>
    </div>
  );
};

export default ImagePopup;
