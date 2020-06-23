import React from "react";
import { Box, Heading, Flex, Text, Link } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Fosters } from "../api/fosters";
import { Animals } from "../api/animals";
import { Link as RouterLink } from "react-router-dom";
import { format } from "timeago.js";
import WeightInput from "./WeightInput";

const Animal = props => (
  <Box>
    {typeof props.animal !== "undefined" && (
      <Box>
        <Flex sx={{ alignItems: "center" }}>
          <RouterLink to={`/spaces/${props.match.params.spaceId}`}>
            ⏪
          </RouterLink>
          <Heading sx={{ marginLeft: 2 }}>{props.animal.name}</Heading>
        </Flex>
        <Text>
          <b>Created At</b> {format(props.animal.createdAt)}
        </Text>
        <Text>
          <b>Updated At</b> {format(props.animal.updatedAt)}
        </Text>
        <Text>
          <b>Foster</b> {props.animal.fosterID || <Link>Add</Link>}
        </Text>
        <Text>
          <b>Lifestage</b> {props.animal.lifestage}
        </Text>
        <Text>
          <b>Mother</b> {props.animal.motherId || <Link>Add</Link>}
        </Text>
        <Text>
          <b>Species</b> {props.animal.species}
        </Text>

        <Box sx={{ marginTop: 3 }}>
          <WeightInput {...props} />
        </Box>
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
