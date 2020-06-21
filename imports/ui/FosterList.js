import React from "react";
import { Fosters } from "../api/fosters";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Text, Heading, Flex, Button } from "theme-ui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Make this work

const FosterList = props => (
  <Box>
    <Flex>
      <Heading>Fosters</Heading>
      <Link to={`/spaces/${props.match.params.id}/fosters/new`}>
        Add New Foster
      </Link>
    </Flex>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created at</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {props.fosters.map(foster => (
          <tr key={foster._id}>
            <td>
              <Text>{foster.name}</Text>
            </td>
            <td>
              <Text>{foster.createdAt}</Text>
            </td>

            <td>
              <Text
                onClick={() =>
                  window.confirm("Are you sure you want to delete this?") &&
                  Meteor.call("foster.remove", foster._id)
                }
              >
                Delete
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    fosters: Fosters.find({ spaceId: spaceId }).fetch()
  };
})(FosterList);
