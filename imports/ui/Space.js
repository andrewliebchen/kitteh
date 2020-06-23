import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Heading, Divider } from "theme-ui";
import AnimalList from "./AnimalList";
import FosterList from "./FosterList";

const Space = props => (
  <Box>
    <AnimalList {...props} />
    <FosterList {...props} />
  </Box>
);

export default Space;
