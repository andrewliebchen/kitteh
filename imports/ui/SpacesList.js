import React from "react";
import { Spaces } from "../api/spaces";
import { Box, Button, Text, Heading, Flex } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Link as RouterLink } from "react-router-dom";

const SpacesList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Spaces</Heading>
      <RouterLink to="/spaces/new">🆕</RouterLink>
    </Flex>
    <table>
      <thead></thead>
      <tbody>
        {props.spaces.map(space => (
          <tr key={space._id}>
            <td>
              <RouterLink to={`/spaces/${space._id}`}>
                <Text>Created at: {space.createdAt}</Text>
              </RouterLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

export default withTracker(() => {
  return {
    spaces: Spaces.find({ ownerId: Meteor.userId() }).fetch()
  };
})(SpacesList);
