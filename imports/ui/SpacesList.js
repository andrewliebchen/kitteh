import React from "react";
import { Spaces } from "../api/spaces";
import { Box, Button, Text, Heading } from "theme-ui";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

const SpacesList = props => (
  <Box>
    <Heading>Spaces</Heading>
    <Button onClick={() => Meteor.call("spaces.insert", props.user)}>
      Create Space
    </Button>
    {props.spaces.map(space => (
      <Link key={space._id} to={`/spaces/${space._id}`}>
        <Text>Created at: {space.createdAt}</Text>
      </Link>
    ))}
  </Box>
);

export default withTracker(() => {
  return {
    spaces: Spaces.find({ ownerId: Meteor.userId() }).fetch()
  };
})(SpacesList);
