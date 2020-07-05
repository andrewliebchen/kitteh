import { Box, Heading, Flex, Link } from "theme-ui";
import { Fosters } from "../api/fosters";
import { PlusSquare } from "react-feather";
import AnimalTable from "./AnimalTable";
import PropTypes from "prop-types";
import React from "react";
import SpaceContext from "./SpaceContext";

function AnimalList() {
  return (
    <SpaceContext.Consumer>
      {props => (
        <Box>
          <Flex sx={{ alignItems: "center" }}>
            <Heading sx={{ marginRight: 2 }}>Animals</Heading>
            <Link href={`/spaces/${props.match.params.spaceId}/animals/new`}>
              <PlusSquare />
            </Link>
          </Flex>
          <AnimalTable {...props} />
        </Box>
      )}
    </SpaceContext.Consumer>
  );
}

export default AnimalList;
