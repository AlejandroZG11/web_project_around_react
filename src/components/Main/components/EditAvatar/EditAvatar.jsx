import { useRef, useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const EditAvatar = () => {
  const avatarInputRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const [isLinkValid, setIsLinkValid] = useState(false);

  const [linkError, setLinkError] = useState("");

  const handleLinkChange = () => {
    const inputValue = avatarInputRef.current.value;
    let isValid = false;
    let currentError = "";

    try {
      new URL(inputValue);
      isValid = true;
    } catch (e) {
      isValid = false;
      // Muestra el mensaje de error solo si el usuario ha escrito algo
      if (inputValue.length > 0) {
        currentError = "Por favor, introduce una URL de imagen válida.";
      }
    }
    setIsLinkValid(isValid);
    setLinkError(currentError);
  };

  useEffect(() => {
    handleLinkChange();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  };

  return (
    <form
      className="form popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <h2 className="popup__title">Cambiar foto de perfil</h2>
        <input
          className="popup__input"
          type="url"
          name="avatar"
          placeholder="URL de la imagen"
          required
          ref={avatarInputRef}
          onChange={handleLinkChange}
        />
        {/* Mostrar mensaje de error para el enlace */}
        <span className="input-error popup__input-error_active">
          {linkError}
        </span>

        <button className="form__submit" type="submit" disabled={!isLinkValid}>
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default EditAvatar;
