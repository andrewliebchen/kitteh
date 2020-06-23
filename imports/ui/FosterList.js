import { Animals } from "../api/animals";
import { Box, Text, Heading, Flex, Button } from "theme-ui";
import { format } from "timeago.js";
import { Fosters } from "../api/fosters";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React from "react";

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
              <Text sx={{ fontWeight: "bold" }}>
                <Link
                  to={`/spaces/${props.match.params.id}/fosters/${foster._id}`}
                >
                  {foster.name}
                </Link>
              </Text>
            </td>
            <td>
              <Text>{format(foster.createdAt)}</Text>
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
    animals: Animals.find({ spaceId: spaceId }).fetch(),
    fosters: Fosters.find({ spaceId: spaceId }).fetch()
  };
})(FosterList);
