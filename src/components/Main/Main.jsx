import profile from "../../images/profile.jpg";
import edit from "../../images/edit_avatar.svg";
import Card from "./components/Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Popup from "./components/Popup/Popup.jsx";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import ConfirmDeletePopup from "./components/ConfirmDeletePopup/ConfirmDeletePopup.jsx";

const Main = (props) => {
  const {
    onOpenPopup,
    cards,
    onCardLike,
    onCardDelete,
    onCardClick,
    popup,
    onClosePopup,
    onConfirmDelete,
    cardToDelete,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const handleEditAvatarClick = () => {
    onOpenPopup({ type: "editAvatar" });
  };

  const handleEditProfileClick = () => {
    onOpenPopup({ type: "editProfile" });
  };

  const handleAddPlaceClick = () => {
    onOpenPopup({ type: "addPlace" });
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-section">
          <img
            className="profile__avatar"
            src={currentUser?.avatar || profile}
            alt="Foto de perfil"
          />
          <button
            className="profile__avatar-edit"
            onClick={handleEditAvatarClick}
          >
            <img id="avatar-edit" src={edit} alt="Botón de editar avatar" />
          </button>
        </div>
        <div className="profile__contents">
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser?.name}</h1>
            <p className="profile__info-description">{currentUser?.about}</p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            onClick={handleEditProfileClick}
            aria-label="Editar perfil"
          ></button>
          <button
            type="button"
            className="profile__add-button"
            onClick={handleAddPlaceClick}
            aria-label="Añadir lugar"
          ></button>
        </div>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {Array.isArray(cards) &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
        </ul>
      </section>

      {popup && (
        <Popup title={popup.title} onClose={onClosePopup}>
          {popup.type === "editProfile" && (
            <EditProfile onClose={onClosePopup} />
          )}
          {popup.type === "editAvatar" && <EditAvatar onClose={onClosePopup} />}
          {popup.type === "addPlace" && <NewCard onClose={onClosePopup} />}
          {popup.type === "image" && (
            <ImagePopup
              title={popup.title}
              link={popup.link}
              alt={popup.title}
            />
          )}
          {popup.type === "confirmDelete" && (
            <ConfirmDeletePopup
              onConfirm={onConfirmDelete}
              onClose={onClosePopup}
              cardToDelete={cardToDelete}
            />
          )}
        </Popup>
      )}
    </main>
  );
};

export default Main;
