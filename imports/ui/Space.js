import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Spaces } from "../api/spaces";
import { Box, Heading } from "theme-ui";
import AnimalList from "./AnimalList";

const Space = props => (
  <Box>
    <AnimalList {...props} />
  </Box>
);

export default Space;
