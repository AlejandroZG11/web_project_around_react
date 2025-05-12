import profile from "../../images/profile.jpg";
import edit from "../../images/edit_avatar.svg";
import Card from "./components/Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Main = (props) => {
  const { onOpenPopup, cards, onCardLike, onCardDelete, onCardClick } = props;

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
            <h1 className="profile__info-name" id="profile-name">
              {currentUser?.name}
            </h1>
            <p className="profile__info-description" id="profile-description">
              {currentUser?.about}
            </p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            onClick={handleEditProfileClick}
          ></button>
          <button
            type="button"
            className="profile__add-button"
            id="profile__add-button"
            onClick={handleAddPlaceClick}
          ></button>
        </div>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {Array.isArray(cards) &&
            cards.map((card) => {
              const isLiked =
                currentUser?._id &&
                card.likes &&
                Array.isArray(card.likes) &&
                card.likes.some((like) => like._id === currentUser._id);
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={() => onCardClick(card)}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  isLiked={!!isLiked}
                  currentUser={currentUser}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
