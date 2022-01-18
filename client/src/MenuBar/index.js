import React, { useContext,useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext} from "../utils/auth"

function MenuBar() {
  const { user, logout} = useContext(AuthContext)
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path);

  console.log(activeItem);

  const handleItemClick = (event, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu pointing secondary color="blue" size="massive">
      {!user ? (
        <>
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
              to="/login"
            />
          </Menu.Menu>
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </>
      ) : (
        <>
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
          />
            <Menu.Item
            position="right"
            name="logout"
            active
            onClick={ logout}
          />
        </>
      )}
    </Menu>
  );
}

export default MenuBar;

