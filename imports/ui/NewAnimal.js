import { Animals } from "../api/animals";
import { Box, Heading } from "theme-ui";
import { Fosters } from "../api/fosters";
import { withTracker } from "meteor/react-meteor-data";
import AnimalForm from "./AnimalForm";
import React from "react";

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
    animals: Animals.find({ spaceId: spaceId }).fetch(),
    fosters: Fosters.find({ spaceId: spaceId }).fetch()
  };
})(NewAnimal);
