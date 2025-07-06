// src/components/Main/components/ImagePopup/ImagePopup.jsx

const ImagePopup = ({ title, link, alt }) => {
  return (
    // Usamos las clases de tu archivo popup.css
    <div className="popup__photo-content">
      <img src={link} alt={alt} className="popup__photo-link" />
      <p className="popup__photo-name">{title}</p>
    </div>
  );
};

export default ImagePopup;
