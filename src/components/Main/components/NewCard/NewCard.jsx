const NewCard = () => {
  return (
    <form className="form popup__form" id="cards-form" noValidate>
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
        />
        <span className="input-error" id="title-error"></span>
        <input
          className="popup__input"
          type="url"
          name="link"
          id="image-url"
          placeholder="Enlace a la imagen"
          required
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
