import React from "react";
import ImagePopup from "../ImagePopup/ImagePopup";
const Card = ({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  isLiked,
  currentUser,
}) => {
  const { _id, title, link, owner, likes } = card;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  // Verifica si el usuario actual es el propietario de la tarjeta
  const isOwn = owner._id === currentUser._id;

  // Determina la clase del botón de "like"
  const cardLikeButtonClassName = `element__heart-button ${
    isLiked ? "element__heart-button_active" : ""
  }`;

  return (
    <li className="element">
      {isOwn && (
        <button
          className="element__photo-trash"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="element__photo-link"
        src={link}
        alt={title}
        onClick={() =>
          onCardClick({
            title: title,
            children: <ImagePopup title={title} link={link} alt={title} />,
          })
        }
      />
      <div className="element__photo-info">
        <p className="element__photo-name">{card.name}</p>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{likes?.length || 0}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
