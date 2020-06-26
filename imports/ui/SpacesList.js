import React from "react";
import { Spaces } from "../api/spaces";
import { Box, Button, Text, Heading, Flex } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Link as RouterLink } from "react-router-dom";
import EditField from "./EditField";

const SpacesList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Spaces</Heading>
      <RouterLink to="/spaces/new">🆕</RouterLink>
    </Flex>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {props.spaces.map(space => (
          <tr key={space._id}>
            <td>
              <EditField
                _id={space._id}
                value="name"
                label={space.name}
                method="spaces.update"
                link={`/spaces/${space._id}`}
              />
            </td>
            <td>
              <Text>{space.createdAt}</Text>
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
