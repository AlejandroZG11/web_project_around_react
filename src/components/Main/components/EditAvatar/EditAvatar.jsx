import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const EditAvatar = () => {
  const avatarInputRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

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
          id="profilepic-input"
          placeholder="URL de la imagen"
          required
          ref={avatarInputRef}
        />
        <span className="input-error" id="profilepic-input-error"></span>
        <button className="form__submit" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default EditAvatar;
