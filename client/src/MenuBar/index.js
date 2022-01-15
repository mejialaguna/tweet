import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ModalInfo from "../ModalInfo";
import Register from "../Register";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.slice(1);
  console.log(path);

  const [open, setOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const activeModal = () => {
    setOpen(true);
  };
  return (
    <Menu pointing secondary color="blue" size="massive">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="login"
        />
      </Menu.Menu>
      {/* <Menu.Item
        name="register"
        active={activeItem === "register"}
        onClick={(handleItemClick, activeModal)}
        as={Link}
        to="/register"
      /> */}
      <ModalInfo
        modalOpen={open}
        name = {"register"}
      />
      {/* <Menu.Item
        name="logout"
        active={activeItem === "logout"}
        onClick={handleItemClick}
      /> */}
    </Menu>
  );
}

export default MenuBar;
