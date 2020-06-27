import { Animals } from "../api/animals";
import { Box, Heading, Flex, Link } from "theme-ui";
import { PlusSquare } from "react-feather";
import { withTracker } from "meteor/react-meteor-data";
import AnimalTable from "./AnimalTable";
import PropTypes from "prop-types";
import React from "react";

const AnimalList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Animals</Heading>
      <Link href={`/spaces/${props.match.params.spaceId}/animals/new`}>
        <PlusSquare />
      </Link>
    </Flex>
    <AnimalTable {...props} />
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch()
  };
})(AnimalList);
