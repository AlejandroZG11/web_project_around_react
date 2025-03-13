import React from "react";
import logo from "../../images/logo.png";
import line from "../../images/header_line.png";

function Header() {
  return (
    <header className="header">
      <img
        className="logo header__logo"
        src={logo}
        alt="Logo de Around The U.S."
      />
      <img
        className="line header__line"
        src={line}
        alt="Línea blanca separadora"
      />
    </header>
  );
}

export default Header;
