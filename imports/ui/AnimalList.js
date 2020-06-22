import { Animals } from "../api/animals";
import { Box, Text, Heading, Flex, Button } from "theme-ui";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React from "react";

const AnimalList = props => (
  <Box>
    <Flex>
      <Heading>Animals</Heading>
      <Link to={`/spaces/${props.match.params.id}/animals/new`}>
        Add New Animal
      </Link>
    </Flex>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created at</th>
          <th>Type</th>
          <th>Lifestage</th>
          <th>Mother</th>
          <th>Foster</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {props.animals.map(animal => (
          <tr key={animal._id}>
            <td>
              <Text>{animal.name}</Text>
            </td>
            <td>
              <Text>{format(animal.createdAt)}</Text>
            </td>
            <td>
              <Text>{animal.type}</Text>
            </td>
            <td>
              <Text>{animal.lifestage}</Text>
            </td>
            <td>
              <Text>{animal.motherId}</Text>
            </td>
            <td>
              <Text>{animal.fosterId}</Text>
            </td>
            <td>
              <Text
                onClick={() =>
                  window.confirm("Are you sure you want to delete this?") &&
                  Meteor.call("animals.remove", animal._id)
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
    animals: Animals.find({ spaceId: spaceId }).fetch()
  };
})(AnimalList);
