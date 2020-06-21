import React from "react";
import { Box, Heading } from "theme-ui";
import FosterForm from "./FosterForm";

const NewFoster = props => (
  <Box>
    <Heading>New Foster</Heading>
    <FosterForm
      method="fosters.insert"
      spaceId={props.match.params.id}
      {...props}
    />
  </Box>
);

export default NewFoster;
