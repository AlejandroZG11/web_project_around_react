import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const EditProfile = () => {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name: name, about: description });
  };

  return (
    <form
      className="form popup__form"
      id="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
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
          value={name}
          onChange={handleNameChange}
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
          value={description}
          onChange={handleDescriptionChange}
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
