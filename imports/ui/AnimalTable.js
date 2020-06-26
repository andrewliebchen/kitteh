import { format } from "timeago.js";
import { Link as RouterLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Text, Link } from "theme-ui";
import PropTypes from "prop-types";
import React from "react";

const AnimalTable = props => (
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
            <Text sx={{ fontWeight: "bold" }}>
              <RouterLink
                to={`/spaces/${props.match.params.id}/animals/${animal._id}`}
              >
                {animal.name}
              </RouterLink>
            </Text>
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
            <Link
              onClick={() =>
                window.confirm("Are you sure you want to delete this?") &&
                Meteor.call("animals.remove", animal._id)
              }
            >
              Delete
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

AnimalTable.propTypes = {
  animals: PropTypes.array
};

export default AnimalTable;
