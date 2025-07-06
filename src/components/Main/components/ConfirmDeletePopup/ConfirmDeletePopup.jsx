// src/components/Main/components/ConfirmDeletePopup/ConfirmDeletePopup.jsx

const ConfirmDeletePopup = ({ onConfirm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    // Usamos las clases de tu archivo PopupWithConfirmation.css pero adaptadas
    <div className="popup__form" style={{ minHeight: "181px" }}>
      <form className="popupDelete__form" onSubmit={handleSubmit}>
        <fieldset className="popupDelete__fieldset">
          <h2 className="popup__title popupDelete__shure">¿Estás seguro?</h2>
          <button className="form__submit popupDelete__button" type="submit">
            Sí
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ConfirmDeletePopup;
