import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const EditProfile = () => {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isNameValid = name.length >= 2 && name.length <= 40;
    const isDescriptionValid =
      description.length >= 2 && description.length <= 200;
    setIsFormValid(isNameValid && isDescriptionValid);
  }, [name, description]);

  useEffect(() => {
    setName(currentUser?.name || "");
    setDescription(currentUser?.about || "");
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      handleUpdateUser({ name, about: description });
    }
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
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="input-error"></span>
        <input
          className="popup__input"
          type="text"
          name="about-me"
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="input-error"></span>
        <button className="form__submit" type="submit" disabled={!isFormValid}>
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfile;
