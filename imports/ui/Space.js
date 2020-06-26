import { Box, Heading, Flex, Input } from "theme-ui";
import { Link as RouterLink } from "react-router-dom";
import { Spaces } from "../api/spaces";
import { withTracker } from "meteor/react-meteor-data";
import AnimalList from "./AnimalList";
import EditTextField from "./EditTextField";
import FosterList from "./FosterList";
import React from "react";

const Space = props => (
  <Box>
    {typeof props.space !== "undefined" && (
      <Box>
        <Flex
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
        >
          <Flex sx={{ alignItems: "center" }}>
            <RouterLink to="/">⏪</RouterLink>
            <Heading sx={{ marginLeft: 2 }}>
              <EditTextField
                _id={props.space._id}
                value="name"
                label={props.space.name}
                method="spaces.update"
              />
            </Heading>
          </Flex>
          <Input type="search" placeholder="Search..." sx={{ width: 600 }} />
        </Flex>
        <Box sx={{ mb: 3 }}>
          <AnimalList {...props} />
        </Box>
        <FosterList {...props} />
      </Box>
    )}
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    space: Spaces.findOne(spaceId)
  };
})(Space);
