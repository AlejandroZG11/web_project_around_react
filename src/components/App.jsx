import React, { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";
import NewCard from "./Main/components/NewCard/NewCard.jsx";
import EditProfile from "./Main/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./Main/components/EditAvatar/EditAvatar.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userData = await api.getUserInfo();
        setCurrentUser(userData || {});
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }

      try {
        const initialCardsData = await api.getCardList();
        console.log("Datos de las tarjetas desde la API:", initialCardsData); // AGREGAR ESTO
        if (Array.isArray(initialCardsData)) {
          setCards(initialCardsData);
        } else {
          console.warn(
            "La API no devolvió un array de tarjetas, se usará un array vacío. Recibido:",
            initialCardsData
          );
          setCards([]);
        }
      } catch (error) {
        console.error("Error al obtener la lista de tarjetas:", error);
        setCards([]);
      }
    })();
  }, []);

  const handleUpdateUser = async (newUserInfo) => {
    try {
      const updatedUser = await api.editUserInfo(
        newUserInfo.name,
        newUserInfo.about
      );
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleUpdateAvatar = async (newAvatarData) => {
    try {
      const updatedUser = await api.editAvatar(newAvatarData);
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {}
  };

  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.addCard(newCardData);
      setCards([newCard, ...cards]);
      setPopup(null);
    } catch (error) {
      console.error("Error al agregar una nueva tarjeta:", error);
    }
  };

  const handleCardLike = async (card) => {
    try {
      const isLikedByCurrentUser = card.likes(
        (like) => like._id === currentUser._id
      );
      const updatedCard = await api.changeLikeCardStatus(
        card._id,
        !isLikedByCurrentUser
      );
      setCards((prevCards) =>
        prevCards.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard
        )
      );
    } catch (error) {
      console.error("Error al dar/quitar like:", error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
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
          onCardDelete={handleCardDelete}
          onCardClick={(cardData) =>
            handleOpenPopup({
              title: cardData.name,
              link: cardData.link,
              isImagePopup: true,
            })
          }
        />
        <Footer />
        {popup && (
          <Popup title={popup.title} onClose={handleClosePopup}>
            {React.isValidElement(popup.children)
              ? React.cloneElement(popup.children, {
                  onClose: handleClosePopup,
                  onUpdateUser: handleUpdateUser,
                  onUpdateAvatar: handleUpdateAvatar,
                  onAddPlace: handleAddPlaceSubmit,
                })
              : popup.children}
            {popup.type === "editProfile" && (
              <EditProfile onClose={handleClosePopup} />
            )}
            {popup.type === "editAvatar" && (
              <EditAvatar onClose={handleClosePopup} />
            )}
            {popup.type === "addPlace" && (
              <NewCard onClose={handleClosePopup} />
            )}
            {popup.isImagePopup && <img src={popup.link} alt={popup.title} />}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
