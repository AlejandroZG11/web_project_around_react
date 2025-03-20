const EditProfile = () => {
  return (
    <form className="form popup__form" id="profile-form" noValidate>
      <fieldset className="popup__form">
        <h2 className="popup__title">Editar perfil</h2>
        <input
          className="popup__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="input-error" id="name-error"></span>
        <input
          className="popup__input"
          type="text"
          name="about-me"
          id="about-me"
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="input-error" id="about-me-error"></span>
        <button className="form__submit" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfile;
