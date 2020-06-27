import { Box, Button, Text, Heading, Flex, Link } from "theme-ui";
import { Meteor } from "meteor/meteor";
import { PlusSquare } from "react-feather";
import { Spaces } from "../api/spaces";
import { withTracker } from "meteor/react-meteor-data";
import EditTextField from "./EditTextField";
import React from "react";

const SpacesList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Spaces</Heading>
      <Link href="/spaces/new">
        <PlusSquare />
      </Link>
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
              <EditTextField
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
