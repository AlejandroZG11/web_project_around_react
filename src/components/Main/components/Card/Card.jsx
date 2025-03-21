import ImagePopup from '../ImagePopup/ImagePopup';

const Card = (props) => {
  const { card, onClick } = props;
  const { title, link, isLiked } = card;

  const popupImage = {
    title: '',
    children: <ImagePopup title={title} link={link} />,
  };

  return (
    <li className="element">
      <button className="element__photo-trash"></button>
      <img
        className="element__photo-link"
        src={link}
        alt=""
        onClick={() => onClick(popupImage)} // Llama a la función solo si existe
      />
      <div className="element__photo-info">
        <p className="element__photo-name">{title}</p>
        <button
          className={`element__heart-button ${
            isLiked ? 'element__heart-button_active' : ''
          }`}
        ></button>
        <span className="element__like-count"></span>
      </div>
    </li>
  );
};

export default Card;
