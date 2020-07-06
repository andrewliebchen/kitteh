import "react-toastify/dist/ReactToastify.css";
import { Box, Heading, Flex } from "theme-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "./Account";
import Animal from "./Animal";
import AnimalList from "./AnimalList";
import AnimalProvider from "./AnimalProvider";
import Foster from "./Foster";
import FosterProvider from "./FosterProvider";
import Login from "./Login";
import NewAnimal from "./NewAnimal";
import NewFoster from "./NewFoster";
import NewSpace from "./NewSpace";
import NewTag from "./NewTag";
import React from "react";
import Space from "./Space";
import SpaceProvider from "./SpaceProvider";
import SpacesList from "./SpacesList";
import WeightWizard from "./WeightWizard";

const App = props => (
  <Box sx={{ padding: 3 }}>
    <Router>
      <Flex
        sx={{
          marginBottom: 3,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Heading sx={{ marginRight: 2 }}>😸</Heading>
        <Account />
      </Flex>
      <Switch>
        <Route
          path="/spaces/:spaceId/animals/new"
          render={routeProps => (
            <SpaceProvider {...routeProps}>
              <NewAnimal />
            </SpaceProvider>
          )}
        />
        <Route
          path="/spaces/:spaceId/animals/:animalId"
          render={routeProps => (
            <AnimalProvider {...routeProps}>
              <Animal />
            </AnimalProvider>
          )}
        />

        <Route
          path="/spaces/:spaceId/fosters/new"
          render={routeProps => (
            <SpaceProvider {...routeProps}>
              <NewFoster />
            </SpaceProvider>
          )}
        />
        <Route
          path="/spaces/:spaceId/fosters/:fosterId/weights"
          render={routeProps => (
            <FosterProvider {...routeProps}>
              <WeightWizard />
            </FosterProvider>
          )}
        />
        <Route
          path="/spaces/:spaceId/fosters/:fosterId"
          render={routeProps => (
            <FosterProvider {...routeProps}>
              <Foster />
            </FosterProvider>
          )}
        />

        <Route
          path="/spaces/:spaceId/tags/new"
          render={routeProps => <NewTag />}
        />

        <Route path="/spaces/new" render={routeProps => <NewSpace />} />
        <Route
          path="/spaces/:spaceId"
          render={routeProps => (
            <SpaceProvider {...routeProps}>
              <Space />
            </SpaceProvider>
          )}
        />

        <Route path="/login" component={Login} />
        <Route path="/" component={SpacesList} />
      </Switch>
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
  </Box>
);

export default App;
