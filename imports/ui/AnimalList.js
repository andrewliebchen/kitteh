import React from "react";
import { Animals } from "../api/animals";
import AnimalForm from "./AnimalForm";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Text, Heading, Flex } from "theme-ui";
import PropTypes from "prop-types";

const AnimalList = props => (
  <Box>
    <Heading>Animals</Heading>
    {props.animals.map(animal => (
      <Flex key={animal._id}>
        <Text>{animal.name}</Text>
        <Text>{animal.createdAt}</Text>
        <Text>{animal.type}</Text>
        <Text>{animal.lifestage}</Text>
      </Flex>
    ))}
    <AnimalForm method="animals.insert" spaceId={props.spaceId} />
  </Box>
);

AnimalList.propTypes = {
  spaceId: PropTypes.string
};

export default withTracker(props => {
  return {
    animals: Animals.find({ spaceId: props.spaceId }).fetch()
  };
})(AnimalList);
