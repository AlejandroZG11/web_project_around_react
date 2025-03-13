export default function NewCard() {
  return (
    <form class="form popup__form" id="cards-form" novalidate>
      <fieldset class="popup__form">
        <button class="popup__close-button" type="button"></button>
        <h2 class="popup__title">Nuevo lugar</h2>
        <input
          class="popup__input"
          type="text"
          name="title"
          id="title"
          placeholder="Título"
          minlength="2"
          maxlength="30"
          required
        />
        <span class="input-error" id="title-error"></span>
        <input
          class="popup__input"
          type="url"
          name="link"
          id="image-url"
          placeholder="Enlace a la imagen"
          required
        />
        <span class="input-error" id="image-url-error"></span>
        <button class="form__submit" type="submit">
          Crear
        </button>
      </fieldset>
    </form>
  );
}
