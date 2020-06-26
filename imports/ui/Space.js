import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Heading, Flex, Input } from "theme-ui";
import AnimalList from "./AnimalList";
import FosterList from "./FosterList";
import { Spaces } from "../api/spaces";
import { Link as RouterLink } from "react-router-dom";

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
              {props.space.name || "‍Untitled Space"}
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
