import React from "react";
import AnimalForm from "./AnimalForm";
import { withTracker } from "meteor/react-meteor-data";
import { Animals } from "../api/animals";

const NewAnimal = props => (
  <AnimalForm
    method="animals.insert"
    spaceId={props.match.params.id}
    {...props}
  />
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch()
  };
})(NewAnimal);
