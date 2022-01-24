import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MenuBar from "./MenuBar";
import { Container } from "semantic-ui-react";
import AuthRoute from "./AuthRoute";
import { AuthProvider } from "./utils/auth";
import SinglePost from "./SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container textAlign="justified">
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
