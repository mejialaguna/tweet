import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import authReducer from "./authReducer";

const initialState = {
  user: null,
};
if (localStorage.getItem("jwtToken")) {
  const token = jwtDecode(localStorage.getItem("jwtToken"));
  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = token;
  }
}

const AuthContext = createContext({
  User: null,
  login: (data) => {},
  logOut: () => {},
});

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
