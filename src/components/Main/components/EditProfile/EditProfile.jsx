export default function NewCard() {
  return (
    <form class="form popup__form" id="profile-form" novalidate>
      <fieldset class="popup__form">
        <button class="popup__close-button" type="button"></button>
        <h2 class="popup__title">Editar perfil</h2>
        <input
          class="popup__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre"
          minlength="2"
          maxlength="40"
          required
        />
        <span class="input-error" id="name-error"></span>
        <input
          class="popup__input"
          type="text"
          name="about-me"
          id="about-me"
          placeholder="Acerca de mí"
          minlength="2"
          maxlength="200"
          required
        />
        <span class="input-error" id="about-me-error"></span>
        <button class="form__submit" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
