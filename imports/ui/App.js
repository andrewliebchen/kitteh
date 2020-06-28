import "react-toastify/dist/ReactToastify.css";
import { Box, Heading, Flex } from "theme-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "./Account";
import Animal from "./Animal";
import AnimalList from "./AnimalList";
import Foster from "./Foster";
import Login from "./Login";
import NewAnimal from "./NewAnimal";
import NewFoster from "./NewFoster";
import NewSpace from "./NewSpace";
import React from "react";
import Space from "./Space";
import SpacesList from "./SpacesList";
import WeightWizard from "./WeightWizard";
import NewTag from "./NewTag";

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
          path="/spaces/:spaceId/animals/:animalId"
          render={routeProps => <Animal {...routeProps} />}
        />
        <Route
          path="/spaces/:spaceId/animals/new"
          render={routeProps => <NewAnimal {...routeProps} />}
        />

        <Route
          path="/spaces/:spaceId/fosters/:fosterId/weights"
          render={routeProps => <WeightWizard {...routeProps} />}
        />
        <Route
          path="/spaces/:spaceId/fosters/:fosterId"
          render={routeProps => <Foster {...routeProps} />}
        />
        <Route
          path="/spaces/:spaceId/fosters/new"
          render={routeProps => <NewFoster {...routeProps} />}
        />
        <Route
          path="/spaces/:spaceId/tags/new"
          render={routeProps => <NewTag {...routeProps} />}
        />

        <Route
          path="/spaces/:spaceId"
          render={routeProps => <Space {...routeProps} />}
        />
        <Route
          path="/spaces/new"
          render={routeProps => <NewSpace {...routeProps} />}
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
