import React from "react";
import { Animals } from "../api/animals";
import AnimalForm from "./AnimalForm";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Text, Heading, Flex } from "theme-ui";
import PropTypes from "prop-types";

const AnimalList = props => (
  <Box>
    <Heading>Animals</Heading>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created at</th>
          <th>Type</th>
          <th>Lifestage</th>
          <th>Mother</th>
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
              <Text>{animal.createdAt}</Text>
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

    <AnimalForm method="animals.insert" {...props} />
  </Box>
);

AnimalList.propTypes = {
  spaceId: PropTypes.string
};

export default withTracker(props => {
  return {
    animals: Animals.find({ spaceId: props.spaceId }).fetch()
  };
})(AnimalList);
