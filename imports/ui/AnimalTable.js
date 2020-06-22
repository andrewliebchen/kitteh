import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Text } from "theme-ui";
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
);

export default AnimalTable;
