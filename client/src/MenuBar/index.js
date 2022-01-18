import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/auth";
import SnackBar from "../SnackBar";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path);

  const [SnackBarOpen, setSnackBarOpen] = useState(false);

  const handleSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleItemClick = (event, { name }) => {
    setActiveItem(name);
  };

  function aboveTwoFunctions() {
    handleSnackBar();
    logout();
  }

  return (
    <>
      <Menu
        pointing
        secondary
        color="blue"
        size="massive"
        onSubmit={() => setSnackBarOpen(true)}
      >
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
            <Menu.Item name={user.username} active as={Link} to="/" />
            <Menu.Item
              position="right"
              name="logout"
              active
              onClick={aboveTwoFunctions}
            />
          </>
        )}
      </Menu>
      <SnackBar
        SnackBarOpen={SnackBarOpen}
        severity={"warning"}
        message={"You are Logged Out, see you next time."}
        setSnackBarOpen={setSnackBarOpen}
      />
    </>
  );
}

export default MenuBar;
