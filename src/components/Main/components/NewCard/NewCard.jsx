import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const NewCard = () => {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlaceSubmit({ name: title, link: link });
  };

  return (
    <form
      className="form popup__form"
      id="cards-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <h2 className="popup__title">Nuevo lugar</h2>
        <input
          className="popup__input"
          type="text"
          name="title"
          id="title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          value={title}
          onChange={handleTitleChange}
        />
        <span className="input-error" id="title-error"></span>
        <input
          className="popup__input"
          type="url"
          name="link"
          id="image-url"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="input-error" id="image-url-error"></span>
        <button className="form__submit" type="submit">
          Crear
        </button>
      </fieldset>
    </form>
  );
};

export default NewCard;
