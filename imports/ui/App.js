import "react-toastify/dist/ReactToastify.css";
import { Box, Heading, Flex } from "theme-ui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "./Account";
import Animal from "./Animal";
import AnimalList from "./AnimalList";
import Foster from "./Foster";
import Login from "./Login";
import NewAnimal from "./NewAnimal";
import NewFoster from "./NewFoster";
import React from "react";
import Space from "./Space";
import SpacesList from "./SpacesList";

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
      path="/spaces/:spaceId/fosters/:fosterId"
      render={routeProps => <Foster {...routeProps} />}
    />
    <Route
      path="/spaces/:spaceId/animals/:animalId"
      render={routeProps => <Animal {...routeProps} />}
    />
    <Route
      path="/spaces/:id"
      render={routeProps => <Space {...routeProps} />}
      exact
    />
    <Route path="/" component={SpacesList} exact />
    <ToastContainer
      position="bottom-center"
      closeButton={false}
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
  </Router>
);

export default App;
