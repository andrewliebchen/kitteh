import { Animals } from "../api/animals";
import { Box, Heading, Flex } from "theme-ui";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import AnimalTable from "./AnimalTable";
import PropTypes from "prop-types";
import React from "react";

const AnimalList = props => (
  <Box>
    <Flex>
      <Heading>Animals</Heading>
      <Link to={`/spaces/${props.match.params.id}/animals/new`}>
        Add New Animal
      </Link>
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
