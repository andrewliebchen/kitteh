import React from "react";
import AnimalForm from "./AnimalForm";
import { withTracker } from "meteor/react-meteor-data";
import { Animals } from "../api/animals";
import { Box, Heading } from "theme-ui";

const NewAnimal = props => (
  <Box>
    <Heading>New Animal</Heading>
    <AnimalForm
      method="animals.insert"
      spaceId={props.match.params.id}
      {...props}
    />
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch()
  };
})(NewAnimal);
