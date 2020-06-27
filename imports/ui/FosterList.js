import { Animals } from "../api/animals";
import { Box, Text, Heading, Flex, Button, Link } from "theme-ui";
import { format } from "timeago.js";
import { Fosters } from "../api/fosters";
import { Link as RouterLink } from "react-router-dom";
import { PlusSquare } from "react-feather";
import { withTracker } from "meteor/react-meteor-data";
import { Trash } from "react-feather";
import EditTextField from "./EditTextField";
import PropTypes from "prop-types";
import React from "react";

const FosterList = props => (
  <Box>
    <Flex sx={{ alignItems: "center" }}>
      <Heading sx={{ marginRight: 2 }}>Fosters</Heading>
      <RouterLink to={`/spaces/${props.match.params.id}/fosters/new`}>
        <PlusSquare />
      </RouterLink>
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
              <EditTextField
                _id={foster._id}
                link={`/spaces/${props.match.params.id}/fosters/${foster._id}`}
                sx={{ fontWeight: "bold" }}
                value="name"
                label={foster.name}
                method="fosters.update"
              />
            </td>
            <td>
              <Text>{format(foster.createdAt)}</Text>
            </td>
            <td>
              <Link
                onClick={() =>
                  window.confirm("Are you sure you want to delete this?") &&
                  Meteor.call("foster.remove", foster._id)
                }
              >
                <Trash />
              </Link>
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
