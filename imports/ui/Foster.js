import React from "react";
import { Box, Heading, Flex } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Fosters } from "../api/fosters";
import { Animals } from "../api/animals";
import { Link as RouterLink } from "react-router-dom";
import AnimalTable from "./AnimalTable";
import EditTextField from "./EditTextField";
import WeightWizard from "./WeightWizard";

const Foster = props => (
  <Box>
    {typeof props.foster !== "undefined" && (
      <Box>
        <Flex sx={{ alignItems: "center", mb: 3 }}>
          <RouterLink to={`/spaces/${props.match.params.spaceId}`}>
            ⏪
          </RouterLink>
          <Heading sx={{ marginLeft: 2 }}>
            <EditTextField
              _id={props.foster._id}
              value="name"
              label={props.foster.name}
              method="fosters.update"
            />
          </Heading>
        </Flex>
        <Box sx={{ mb: 3 }}>
          <AnimalTable {...props} />
        </Box>
        <WeightWizard {...props} />
      </Box>
    )}
  </Box>
);

export default withTracker(props => {
  let fosterId = props ? props.match.params.fosterId : "";

  return {
    animals: Animals.find({ fosterId: fosterId }).fetch(),
    foster: Fosters.findOne(fosterId)
  };
})(Foster);
