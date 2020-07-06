import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import { withTracker } from "meteor/react-meteor-data";
import FosterContext from "./FosterContext";
import React from "react";

const FosterProvider = props => (
  <FosterContext.Provider value={props}>
    {props.children}
  </FosterContext.Provider>
);

export default withTracker(props => {
  let fosterId = props ? props.match.params.fosterId : "";

  return {
    foster: Fosters.findOne(fosterId),
    animals: Animals.find({ fosterId: fosterId }).fetch()
  };
})(FosterProvider);
