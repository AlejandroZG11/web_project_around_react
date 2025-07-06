import React from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext"; // Ruta ajustada para el contexto

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { name, link, owner, likes } = card;

  // Verifica si el usuario actual es el propietario de la tarjeta
  const isOwn = owner?._id === currentUser?._id;

  // Verifica si el usuario actual le ha dado "like" a la tarjeta
  const isLiked = card.isLiked;

  const cardLikeButtonClassName = `element__heart-button ${
    isLiked ? "element__heart-button_active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="element">
      <button
        className="element__photo-trash"
        onClick={handleDeleteClick}
        aria-label="Eliminar"
      ></button>
      <img
        className="element__photo-link"
        src={link}
        alt={name}
        onClick={handleCardClick}
      />
      <div className="element__photo-info">
        <p className="element__photo-name">{name}</p>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Me gusta"
          ></button>
          <span className="element__like-count">{likes?.length || 0}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
