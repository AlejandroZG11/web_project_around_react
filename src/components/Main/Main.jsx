import profile from "../../images/profile.jpg";
import edit from "../../images/edit_avatar.svg";
import Card from "./components/Card/Card.jsx";

const cards = [
  {
    isLiked: true,
    _id: "5d1f0611d321eb4bdcd707dd",
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

console.log(cards);

const Main = (props) => {
  const {
    onClickEditProfile,
    onClickEditAvatar,
    onClickCreateCard,
    onClickCard,
  } = props;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-section">
          <img className="profile__avatar" src={profile} alt="Foto de perfil" />
          <button className="profile__avatar-edit">
            <img
              id="avatar-edit"
              src={edit}
              alt="Botón de editar avatar"
              onClick={onClickEditAvatar}
            />
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
          <button
            type="button"
            className="profile__edit-button"
            onClick={onClickEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          id="profile__add-button"
          onClick={onClickCreateCard}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onClick={onClickCard} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
