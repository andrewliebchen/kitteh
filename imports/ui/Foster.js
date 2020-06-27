import { Animals } from "../api/animals";
import { Box, Heading, Flex, Link } from "theme-ui";
import { Fosters } from "../api/fosters";
import { withTracker } from "meteor/react-meteor-data";
import { ArrowLeft } from "react-feather";
import AnimalTable from "./AnimalTable";
import EditTextField from "./EditTextField";
import React from "react";
import WeightWizard from "./WeightWizard";

const Foster = props => (
  <Box>
    {typeof props.foster !== "undefined" && (
      <Box>
        <Flex sx={{ alignItems: "center", mb: 3 }}>
          <Link href={`/spaces/${props.match.params.spaceId}`}>
            <ArrowLeft />
          </Link>
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
