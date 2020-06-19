import React from "react";
import { Box } from "theme-ui";
import AnimalList from "./AnimalList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SpacesList from "./SpacesList";
import Space from "./Space";

const App = props => (
  <Router>
    <Route path="/login" component={Login} />
    <Route path="/animals" component={AnimalList} />
    <Route
      path="/spaces/:id"
      render={routeProps => <Space {...routeProps} />}
    />
    <Route path="/" component={SpacesList} exact />
  </Router>
);

export default App;
