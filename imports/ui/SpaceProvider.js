import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import { Spaces } from "../api/spaces";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import SpaceContext from "./SpaceContext";

const SpaceProvider = props => (
  <SpaceContext.Provider value={props}>{props.children}</SpaceContext.Provider>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch(),
    fosters: Fosters.find({ spaceId: spaceId }).fetch(),
    space: Spaces.findOne(spaceId)
  };
})(SpaceProvider);
