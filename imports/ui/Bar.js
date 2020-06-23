import React from "react";
import { Flex, Box, Text } from "theme-ui";
import { IDEALWEIGHTS } from "../utils/constants";

const Bar = props => {
  const width = (props.value / IDEALWEIGHTS.goal) * 100;
  const atGoal = width >= 100;

  return (
    <Flex
      sx={{
        height: 20,
        flex: "auto",
        bg: "muted"
      }}
    >
      <Flex
        sx={{
          width: `${width}%`,
          height: "inherit",
          bg: atGoal ? "green" : "primary",
          alignItems: "center",
          padding: 1
        }}
      >
        {atGoal && (
          <Text sx={{ color: "white", fontWeight: "bold" }}>Done!</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Bar;
