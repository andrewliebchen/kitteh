import React from "react";
import Tag from "./Tag";
import { PlusSquare } from "react-feather";
import { Box, Text, Flex, Heading, Link } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Tags } from "../api/tags";

const TagList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Tags</Heading>
      <Link href={`/spaces/${props.match.params.spaceId}/tags/new`}>
        <PlusSquare />
      </Link>
    </Flex>
    <Flex>
      {props.tags.map(tag => (
        <Tag key={tag._id} {...tag} />
      ))}
    </Flex>
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    tags: Tags.find({ spaceId: spaceId }).fetch()
  };
})(TagList);
