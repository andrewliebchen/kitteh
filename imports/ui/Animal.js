import React from "react";
import { Box, Heading, Flex } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Fosters } from "../api/fosters";
import { Animals } from "../api/animals";
import { Link } from "react-router-dom";

const Animal = props => (
  <Box>
    {typeof props.animal !== "undefined" && (
      <Box>
        <Flex>
          <Link to={`/spaces/${props.match.params.spaceId}`}>Back</Link>
          <Heading>{props.animal.name}</Heading>
        </Flex>
      </Box>
    )}
  </Box>
);

export default withTracker(props => {
  let animalId = props ? props.match.params.animalId : "";

  return {
    animal: Animals.findOne(animalId)
  };
})(Animal);
