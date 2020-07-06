import React from "react";
import Tag from "./Tag";
import { PlusSquare } from "react-feather";
import { Box, Text, Flex, Heading, Link } from "theme-ui";
import SpaceContext from "./SpaceContext";

const TagList = () => (
  <SpaceContext.Consumer>
    {props => (
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
    )}
  </SpaceContext.Consumer>
);

export default TagList;
