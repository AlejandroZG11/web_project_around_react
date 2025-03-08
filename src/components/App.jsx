import "./index.css";
import logo from "./images/logo.png";
import line from "./images/header_line.png";
import profile from "./images/profile.jpg";
import edit from "./images/edit_avatar.svg";

function App() {
  return (
    <div className="page">
      <header className="header">
        <img
          className=" logo header__logo"
          src={logo}
          alt="Logo de Around The U.S."
        />
        <img
          className="line header__line"
          src={line}
          alt="Línea blanca separadora"
        />
      </header>

      <section className="profile">
        <div className="profile__avatar-section">
          <img className="profile__avatar" src={profile} alt="Foto de perfil" />
          <button className="profile__avatar-edit">
            <img id="avatar-edit" src={edit} alt="Botón de editar avatar" />
          </button>
        </div>
        <div className="profile__contents">
          <div className="profile__info">
            <h1 className="profile__info-name" id="profile-name">
              Alejandro Zuluaga
            </h1>
            <p className="profile__info-description" id="profile-description">
              Explorer
            </p>
          </div>
          <button type="button" className="profile__edit-button"></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          id="profile__add-button"
        ></button>
      </section>

      <main className="elements">
        <div className="elements__container" id="elements-container"></div>
      </main>

      <footer className="footer">
        <p className="footer__text">2025 Around The U.S.</p>
      </footer>
    </div>
  );
}

export default App;
