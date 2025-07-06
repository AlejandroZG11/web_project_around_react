const Popup = ({ title, children, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div className={`popup__content ${!title ? "popup__photo-content" : ""}`}>
        <button
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
