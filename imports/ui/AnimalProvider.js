import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import { Tags } from "../api/tags";
import { withTracker } from "meteor/react-meteor-data";
import AnimalContext from "./AnimalContext";
import React from "react";

const AnimalProvider = props => (
  <AnimalContext.Provider value={props}>
    {props.children}
  </AnimalContext.Provider>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.spaceId : "";
  let animalId = props ? props.match.params.animalId : "";

  return {
    animal: Animals.findOne(animalId),
    fosters: Fosters.find({ spaceId: spaceId }).fetch(),
    tags: Tags.find({ spaceId: spaceId }).fetch()
  };
})(AnimalProvider);
