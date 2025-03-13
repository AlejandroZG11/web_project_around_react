import "../index.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import profile from "../images/profile.jpg";
import edit from "../images/edit_avatar.svg";

function App() {
  return (
    <div className="page">
      <Header />

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

      <Main />
      <Footer />
    </div>
  );
}

export default App;
