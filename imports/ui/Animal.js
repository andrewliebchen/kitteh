import { Animals } from "../api/animals";
import { Box, Heading, Flex, Text, Link } from "theme-ui";
import { format } from "timeago.js";
import { Fosters } from "../api/fosters";
import { Link as RouterLink } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import Bar from "./Bar";
import EditTextField from "./EditTextField";
import React from "react";
import WeightInput from "./WeightInput";

const Animal = props => (
  <Box>
    {typeof props.animal !== "undefined" && (
      <Box>
        <Flex sx={{ alignItems: "center" }}>
          <RouterLink to={`/spaces/${props.match.params.spaceId}`}>
            ⏪
          </RouterLink>
          <Heading sx={{ marginLeft: 2 }}>
            <EditTextField
              _id={props.animal._id}
              value="name"
              label={props.animal.name}
              method="animals.update"
            />
          </Heading>
        </Flex>
        <Text>
          <b>Created At</b> {format(props.animal.createdAt)}
        </Text>
        <Text>
          <b>Updated At</b> {format(props.animal.updatedAt)}
        </Text>
        <Text>
          <b>Foster</b> {props.animal.fosterID || <Link>➕</Link>}
        </Text>
        <Text>
          <b>Lifestage</b> {props.animal.lifestage}
        </Text>
        <Text>
          <b>Mother</b> {props.animal.motherId || <Link>➕</Link>}
        </Text>
        <Text>
          <b>Species</b> {props.animal.species}
        </Text>

        <Box sx={{ marginTop: 3 }}>
          <WeightInput {...props.animal} />
          {props.animal.weight.reverse().map(weight => (
            <Flex key={weight.createdAt} sx={{ alignItems: "center" }}>
              <Text sx={{ width: 300 }}>
                <b>{weight.createdAt}</b> {weight.value}
              </Text>
              <Bar value={weight.value} />
            </Flex>
          ))}
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
