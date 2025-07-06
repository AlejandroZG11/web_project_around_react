import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";
import ImagePopup from "./Main/components/ImagePopup/ImagePopup.jsx";
import NewCard from "./Main/components/NewCard/NewCard.jsx";
import EditProfile from "./Main/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./Main/components/EditAvatar/EditAvatar.jsx";
import ConfirmDeletePopup from "./Main/components/ConfirmDeletePopup/ConfirmDeletePopup.jsx"; // Componente nuevo
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Efecto para cargar datos iniciales del usuario y tarjetas
  useEffect(() => {
    (async () => {
      try {
        const [userData, initialCardsData] = await Promise.all([
          api.getUserInfo(),
          api.getCardList(),
        ]);
        setCurrentUser(userData || {});
        setCards(Array.isArray(initialCardsData) ? initialCardsData : []);
      } catch (error) {
        console.error("Error al obtener datos iniciales:", error);
      }
    })();
  }, []);

  // Efecto para manejar el cierre de popups con la tecla 'Escape'
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    if (popup) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [popup]);

  const handleUpdateUser = async (newUserInfo) => {
    try {
      const updatedUser = await api.editUserInfo(
        newUserInfo.name,
        newUserInfo.about
      );
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleUpdateAvatar = async (newAvatarData) => {
    try {
      const updatedUser = await api.editAvatar(newAvatarData);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    }
  };

  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.addCard(newCardData);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error("Error al agregar una nueva tarjeta:", error);
    }
  };

  const handleCardLike = async (card) => {
    try {
      const isCurrentlyLikedByMe = card.isLiked;

      const updatedCard = await api.changeLikeCardStatus(
        card._id,
        !isCurrentlyLikedByMe
      );

      setCards((prevCards) =>
        prevCards.map((c) => (c._id === updatedCard._id ? updatedCard : c))
      );
    } catch (error) {
      console.error("Error al dar/quitar like:", error);
    }
  };

  const handleCardDeleteRequest = (card) => {
    setCardToDelete(card);
    handleOpenPopup({ type: "confirmDelete" });
  };

  const handleConfirmCardDelete = async () => {
    if (!cardToDelete) return;
    try {
      await api.deleteCard(cardToDelete._id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== cardToDelete._id)
      );
      handleClosePopup();
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    } finally {
      setCardToDelete(null);
    }
  };

  const handleOpenPopup = (content) => {
    setPopup(content);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteRequest}
          onCardClick={(cardData) =>
            handleOpenPopup({
              type: "image",
              title: cardData.name,
              link: cardData.link,
            })
          }
        />
        <Footer />

        {popup && (
          <Popup title={popup.title} onClose={handleClosePopup}>
            {popup.type === "editProfile" && (
              <EditProfile onClose={handleClosePopup} />
            )}
            {popup.type === "editAvatar" && (
              <EditAvatar onClose={handleClosePopup} />
            )}
            {popup.type === "addPlace" && (
              <NewCard onClose={handleClosePopup} />
            )}
            {popup.type === "image" && (
              <ImagePopup
                title={popup.title}
                link={popup.link}
                alt={popup.title}
              />
            )}
            {popup.type === "confirmDelete" && (
              <ConfirmDeletePopup
                onConfirm={handleConfirmCardDelete}
                onClose={handleClosePopup}
              />
            )}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
