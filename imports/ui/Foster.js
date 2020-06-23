import React from "react";
import { Box, Heading, Flex } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Fosters } from "../api/fosters";
import { Animals } from "../api/animals";
import { Link as RouterLink } from "react-router-dom";
import AnimalTable from "./AnimalTable";

const Foster = props => (
  <Box>
    {typeof props.foster !== "undefined" && (
      <Box>
        <Flex sx={{ alignItems: "center" }}>
          <RouterLink to={`/spaces/${props.match.params.spaceId}`}>
            ⏪
          </RouterLink>
          <Heading sx={{ marginLeft: 2 }}>{props.foster.name}</Heading>
        </Flex>
        <AnimalTable {...props} />
      </Box>
    )}
  </Box>
);

export default withTracker(props => {
  let fosterId = props ? props.match.params.fosterId : "";

  return {
    animals: Animals.find({ fosterId: fosterId }).fetch(),
    foster: Fosters.findOne(fosterId)
  };
})(Foster);
