import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Heading, Divider } from "theme-ui";
import AnimalList from "./AnimalList";
import FosterList from "./FosterList";
import { Spaces } from "../api/spaces";

const Space = props => (
  <Box>
    {typeof props.space !== "undefined" && (
      <Box>
        {console.log(props)}
        <Heading>{props.space.name || "Unnamed Space"}</Heading>
        <AnimalList {...props} />
        <FosterList {...props} />
      </Box>
    )}
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    space: Spaces.findOne(spaceId)
  };
})(Space);
