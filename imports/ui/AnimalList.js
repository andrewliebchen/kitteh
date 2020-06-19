import React from "react";
import { Animals } from "../api/animals";
import AnimalForm from "./AnimalForm";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Text, Heading, Flex } from "theme-ui";

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
    <AnimalForm method="animals.insert" />
  </Box>
);

export default withTracker(() => {
  return {
    animals: Animals.find({}).fetch()
  };
})(AnimalList);
