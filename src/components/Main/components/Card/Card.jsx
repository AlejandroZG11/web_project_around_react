import CardImage from '../CardImage/CardImage';

const Card = (props) => {
  const { card, onClick = () => {} } = props; // Previene el error si no se pasa onClick
  const { title, link, isLiked } = card;

  const popupImage = {
    title: '',
    children: <CardImage title={title} link={link} />,
  };

  return (
    <li className="element">
      <button className="element__photo-trash"></button>
      <img
        className="element__photo-link"
        src={link}
        alt={title}
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
