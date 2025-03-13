import React from "react";
import CloseIcon from "../../../images/container__close-icon.svg";

export default function Popup(props) {
  const { title, children } = props;
  return (
    <div className="popup">
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <div className="popup__close-button">
          <img src={CloseIcon} alt="ícono de cerrar ventana" />
        </div>
        <h2 className="form__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
