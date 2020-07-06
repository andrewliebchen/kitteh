import { Box, Flex, Heading, Link } from "theme-ui";
import { PlusSquare } from "react-feather";
import React from "react";
import SpaceContext from "./SpaceContext";
import Tag from "./Tag";

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
