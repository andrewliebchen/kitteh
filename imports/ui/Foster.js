import React from "react";
import { Box, Heading, Flex } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Fosters } from "../api/fosters";
import { Link } from "react-router-dom";

const Foster = props => (
  <Box>
    {typeof props.foster !== "undefined" && (
      <Flex>
        <Link to={`/spaces/${props.match.params.spaceId}`}>Back</Link>
        <Heading>{props.foster.name}</Heading>
      </Flex>
    )}
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.fosterId : "";

  return {
    foster: Fosters.findOne(spaceId)
  };
})(Foster);
