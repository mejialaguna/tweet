import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "semantic-ui-css/semantic.min.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MenuBar from "./MenuBar"
import { Container } from "semantic-ui-react";
import { StoreProvider } from "./utils/GlobalState";



function App() {
  return (
    <Router>
      <StoreProvider>
        <Container textAlign="justified">
          <MenuBar />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/register" component={Register} /> */}
        </Container>
      </StoreProvider>
    </Router>
  );
}

export default App;
