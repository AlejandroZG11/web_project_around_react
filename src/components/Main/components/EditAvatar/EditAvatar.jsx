import { useRef, useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const EditAvatar = () => {
  const avatarInputRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const [isLinkValid, setIsLinkValid] = useState(false);
  // Nuevo estado para el mensaje de error del enlace
  const [linkError, setLinkError] = useState("");

  const handleLinkChange = () => {
    const inputValue = avatarInputRef.current.value;
    let isValid = false;
    let currentError = "";

    try {
      // Intenta crear un objeto URL. Esto verificará que el formato sea válido (ej. que empiece con http:// o https://)
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
    setLinkError(currentError); // Actualiza el mensaje de error
  };

  useEffect(() => {
    // Llama a handleLinkChange en el montaje inicial para validar el estado inicial del campo.
    // Esto asegura que el botón esté deshabilitado si el campo está vacío al abrir el popup.
    handleLinkChange();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleSubmit = (e) => {
    e.preventDefault();
    // El botón 'Guardar' ya está deshabilitado si !isLinkValid,
    // por lo que no es necesario un 'if (isLinkValid)' aquí.
    handleUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
    // Opcional: limpiar el campo después de una actualización exitosa
    // if (avatarInputRef.current) {
    //   avatarInputRef.current.value = "";
    //   setIsLinkValid(false); // Resetear el estado de validez
    //   setLinkError(""); // Limpiar el error
    // }
  };

  return (
    <form
      className="form popup__form"
      id="avatar-form"
      noValidate // Deshabilita la validación HTML5 predeterminada si prefieres el control completo con React
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <h2 className="popup__title">Cambiar foto de perfil</h2>
        <input
          className="popup__input"
          type="url" // El tipo 'url' de HTML5 también proporciona una validación básica en algunos navegadores
          name="avatar"
          placeholder="URL de la imagen"
          required
          ref={avatarInputRef}
          onChange={handleLinkChange} // Llama a la validación cada vez que el valor del input cambia
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
