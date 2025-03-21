import { useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import NewCard from "./Main/components/NewCard/NewCard.jsx";
import EditProfile from "./Main/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./Main/components/EditAvatar/EditAvatar.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";

function App() {
  const [popup, setPopup] = useState(null);
  console.log("Estado actual de popup:", popup);

  const popupEditAvatar = {
    title: "Edit Avatar",
    children: <EditAvatar />,
  };

  const popupCreateCard = {
    title: "Nuevo Lugar",
    children: <NewCard />,
  };

  const popupEditProfile = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };

  return (
    <div className="page">
      <Header />
      <Main
        onClickEditProfile={() => {
          console.log("📝 Abriendo Editar Perfil");
          setPopup({ title: "Editar Perfil", children: <EditProfile /> });
        }}
        onClickEditAvatar={() => {
          console.log("🖼️ Abriendo Editar Avatar");
          setPopup({ title: "Edit Avatar", children: <EditAvatar /> });
        }}
        onClickCreateCard={() => {
          console.log("📍 Abriendo Nuevo Lugar");
          setPopup({ title: "Nuevo Lugar", children: <NewCard /> });
        }}
        onClickCard={(popupImage) => setPopup(popupImage)}
      />
      <Footer />
      {popup && (
        <Popup
          title={popup.title}
          onClose={() => {
            console.log("❌ Cerrando popup...");
            setPopup(null);
          }}
        >
          {popup.children}
        </Popup>
      )}
    </div>
  );
}

export default App;
