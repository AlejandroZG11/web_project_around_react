import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

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

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleClosePopup();
      }
    };

    if (popup) {
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [popup]);

  // --- CORRECCIÓN AQUÍ: FUNCIÓN handleCardLike ---
  const handleCardLike = async (card) => {
    // Usamos 'card.isLiked' directamente, ya que el servidor nos envía esta propiedad.
    // Esto determina si la tarjeta actualmente tiene 'Me gusta' por el usuario actual.
    const isCurrentlyLikedByMe = card.isLiked;

    try {
      // Pasamos el valor negado de 'isCurrentlyLikedByMe' a la API.
      // Si es true (ya tiene 'Me gusta'), !isCurrentlyLikedByMe será false, y la API hará DELETE.
      // Si es false (no tiene 'Me gusta'), !isCurrentlyLikedByMe será true, y la API hará PUT.
      const newCard = await api.changeLikeCardStatus(
        card._id,
        !isCurrentlyLikedByMe
      );

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error("Error al dar/quitar like:", error);
    }
  };
  // --- FIN DE LA CORRECCIÓN ---

  const handleCardDeleteRequest = (card) => {
    setCardToDelete(card);
    setPopup({ type: "confirmDelete" });
  };

  const handleConfirmCardDelete = async () => {
    try {
      await api.deleteCard(cardToDelete._id);
      setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
      handleClosePopup();
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  const handleOpenPopup = (popupData) => {
    setPopup(popupData);
  };

  const handleClosePopup = () => {
    setPopup(null);
    setCardToDelete(null);
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await api.editUserInfo(userData.name, userData.about);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
  };

  const handleUpdateAvatar = async (avatarData) => {
    try {
      const updatedUser = await api.editUserAvatar(avatarData.avatar);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    }
  };

  const handleAddPlaceSubmit = async (placeData) => {
    try {
      const newCard = await api.addPlace(placeData);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error("Error al agregar nueva tarjeta:", error);
    }
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
          popup={popup}
          onClosePopup={handleClosePopup}
          onConfirmDelete={handleConfirmCardDelete}
          cardToDelete={cardToDelete}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
