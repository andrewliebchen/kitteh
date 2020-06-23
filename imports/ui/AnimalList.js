import { Animals } from "../api/animals";
import { Box, Heading, Flex } from "theme-ui";
import { Link as RouterLink } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import AnimalTable from "./AnimalTable";
import PropTypes from "prop-types";
import React from "react";

const AnimalList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Animals</Heading>
      <RouterLink to={`/spaces/${props.match.params.id}/animals/new`}>
        🆕
      </RouterLink>
    </Flex>
    <AnimalTable {...props} />
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch()
  };
})(AnimalList);
