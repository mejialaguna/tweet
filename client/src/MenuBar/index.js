import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ModalInfo from "../ModalInfo";
import { UPDATE_ACTIVE_ITEM } from "../utils/actions";

import { useStoreContext } from "../utils/GlobalState";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path);
  const [state, dispatch] = useStoreContext();
  const { currentItem } = state;
  
  console.log(activeItem);
  
  // const handleItemClick = (e, { name }) => {
  //     setActiveItem(name);
  //   };
    
    const dispatchActiveItem = (event,{name}) => {
      event.preventDefault();
      dispatch({
        type: UPDATE_ACTIVE_ITEM,
        currentItem: name, //activeItem is the state
      });
      // setActiveItem(currentItem);
  };

  return (
    <Menu pointing secondary color="blue" size="massive">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={dispatchActiveItem }
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={dispatchActiveItem }
          as={Link}
          to="/login"
        >
          <ModalInfo currentItem={currentItem} name={"Login"} />
        </Menu.Item>
      </Menu.Menu>
      <Menu.Item
        name="register"
        active={activeItem === "register"}
        onClick={dispatchActiveItem }
        as={Link}
        to="/register"
      >
        <ModalInfo currentItem={currentItem} name={"Register"} />
      </Menu.Item>

      {/* <Menu.Item
        name="logout"
        active={activeItem === "logout"}
        onClick={handleItemClick}
      /> */}
    </Menu>
  );
}

export default MenuBar;
