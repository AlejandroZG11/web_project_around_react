import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const NewCard = ({ onClose }) => {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Nuevos estados para los mensajes de error específicos de cada campo
  const [titleError, setTitleError] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    // --- Validación del Título ---
    let isTitleValid = true;
    let currentTitleError = "";
    if (title.length < 2 || title.length > 30) {
      isTitleValid = false;
      if (title.length > 0) {
        // Solo mostrar error si el usuario ha empezado a escribir
        currentTitleError = "El título debe tener entre 2 y 30 caracteres.";
      }
    }
    setTitleError(currentTitleError);

    // --- Validación del Enlace (URL) ---
    let isLinkValid = false;
    let currentLinkError = "";
    try {
      new URL(link); // Intenta crear un objeto URL, requiere 'http://' o 'https://'
      isLinkValid = true;
    } catch (e) {
      isLinkValid = false;
      if (link.length > 0) {
        // Solo mostrar error si el usuario ha empezado a escribir
        currentLinkError = "Por favor, introduce una URL válida";
      }
    }
    setLinkError(currentLinkError);

    // --- Determinar la validez general del formulario ---
    // El formulario es válido si ambos campos son válidos y no están vacíos (a menos que quieras permitir enviar con campos vacíos)
    setIsFormValid(
      isTitleValid && isLinkValid && title.length > 0 && link.length > 0
    );
  }, [title, link]); // Dependencias: re-evalúa cuando title o link cambian

  const handleSubmit = (event) => {
    event.preventDefault();
    // El botón estará deshabilitado si el formulario no es válido,
    // así que no necesitamos una comprobación 'if (isFormValid)' aquí.
    handleAddPlaceSubmit({ name: title, link: link });
    // Opcional: limpiar los campos después de enviar el formulario
    // setTitle("");
    // setLink("");
  };

  return (
    <form
      className="form popup__form"
      id="cards-form"
      noValidate // Deshabilita la validación HTML5 por defecto si prefieres controlar todo con React
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <h2 className="popup__title">Nuevo lugar</h2>
        <input
          className="popup__input"
          type="text"
          name="title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Mostrar mensaje de error para el título */}
        <span className="input-error popup__input-error_active">
          {titleError}
        </span>

        <input
          className="popup__input"
          type="url" // El tipo 'url' de HTML5 también proporciona cierta validación básica del navegador
          name="link"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {/* Mostrar mensaje de error para el enlace */}
        <span className="input-error popup__input-error_active">
          {linkError}
        </span>

        <button className="form__submit" type="submit" disabled={!isFormValid}>
          Crear
        </button>
      </fieldset>
    </form>
  );
};

export default NewCard;
