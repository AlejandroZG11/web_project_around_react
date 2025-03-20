const CardImage = (props) => {
  const { title, link } = props;
  return (
    <>
      <img src={link} alt="" className="popup__photo-link" />
      <p className="popup__photo-name">{title}</p>
    </>
  );
};

export default CardImage;
