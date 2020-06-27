import { Box, Heading, Flex, Link } from "theme-ui";
import { Spaces } from "../api/spaces";
import { withTracker } from "meteor/react-meteor-data";
import { ArrowLeft } from "react-feather";
import AnimalList from "./AnimalList";
import EditTextField from "./EditTextField";
import FosterList from "./FosterList";
import React from "react";
import SpaceSearch from "./SpaceSearch";

const Space = props => (
  <Box>
    {typeof props.space !== "undefined" && (
      <Box>
        <Flex
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
        >
          <Flex sx={{ alignItems: "center" }}>
            <Link href="/">
              <ArrowLeft />
            </Link>
            <Heading sx={{ marginLeft: 2 }}>
              <EditTextField
                _id={props.space._id}
                value="name"
                label={props.space.name}
                method="spaces.update"
              />
            </Heading>
          </Flex>
          <SpaceSearch />
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
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    space: Spaces.findOne(spaceId)
  };
})(Space);
