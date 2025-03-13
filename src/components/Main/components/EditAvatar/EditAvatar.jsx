export default function NewCard() {
  return (
    <form class="form popup__form" id="avatar-form" novalidate>
      <fieldset class="popup__form">
        <button class="popup__close-button" type="button"></button>
        <h2 class="popup__title">Cambiar foto de perfil</h2>
        <input
          class="popup__input"
          type="url"
          name="avatar"
          id="profilepic-input"
          placeholder="URL de la imagen"
          required
        />
        <span class="input-error" id="profilepic-input-error"></span>
        <button class="form__submit" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
