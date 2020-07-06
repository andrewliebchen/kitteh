import { Animals } from "../api/animals";
import { Box, Text, Heading, Flex, Button, Link } from "theme-ui";
import { Fosters } from "../api/fosters";
import { PlusSquare } from "react-feather";
import { Trash } from "react-feather";
import dayjs from "dayjs";
import EditTextField from "./EditTextField";
import PropTypes from "prop-types";
import React from "react";
import RelativeTime from "dayjs/plugin/relativeTime";
import SpaceContext from "./SpaceContext";

dayjs.extend(RelativeTime);

const FosterList = () => (
  <SpaceContext.Consumer>
    {props => (
      <Box>
        <Flex sx={{ alignItems: "center" }}>
          <Heading sx={{ marginRight: 2 }}>Fosters</Heading>
          <Link href={`/spaces/${props.match.params.spaceId}/fosters/new`}>
            <PlusSquare />
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
                  <EditTextField
                    _id={foster._id}
                    link={`/spaces/${props.match.params.spaceId}/fosters/${foster._id}`}
                    sx={{ fontWeight: "bold" }}
                    value="name"
                    label={foster.name}
                    method="fosters.update"
                  />
                </td>
                <td>
                  <Text>{dayjs(foster.createdAt).fromNow()}</Text>
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
    )}
  </SpaceContext.Consumer>
);

export default FosterList;
