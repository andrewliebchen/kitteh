import React from "react";
import { Box, Heading, Flex } from "theme-ui";
import AnimalList from "./AnimalList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SpacesList from "./SpacesList";
import Space from "./Space";
import Account from "./Account";
import NewAnimal from "./NewAnimal";
import NewFoster from "./NewFoster";

const App = props => (
  <Router>
    <Flex>
      <Heading>Kitteh</Heading>
      <Account />
    </Flex>
    <Route path="/login" component={Login} />
    <Route path="/animals" component={AnimalList} />
    <Route
      path="/spaces/:id/animals/new"
      render={routeProps => <NewAnimal {...routeProps} />}
    />
    <Route
      path="/spaces/:id/fosters/new"
      render={routeProps => <NewFoster {...routeProps} />}
    />
    <Route
      path="/spaces/:id"
      render={routeProps => <Space {...routeProps} />}
      exact
    />
    <Route path="/" component={SpacesList} exact />
  </Router>
);

export default App;
