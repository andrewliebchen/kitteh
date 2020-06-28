import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "theme-ui";
import { X } from "react-feather";

const Tag = props => (
  <Box
    sx={{
      p: 2,
      bg: props.color,
      display: "inline-block",
      mr: 2,
      color: "white"
    }}
  >
    <Flex
      sx={{
        alignItems: "center"
      }}
    >
      <Text>{props.label}</Text>
      <X />
    </Flex>
  </Box>
);

export default Tag;
