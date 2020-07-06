import { ArrowLeft } from "react-feather";
import { Box, Heading, Flex, Link } from "theme-ui";
import { isReady } from "../utils/helpers";
import AnimalList from "./AnimalList";
import EditTextField from "./EditTextField";
import FosterList from "./FosterList";
import React from "react";
import SpaceContext from "./SpaceContext";
import SpaceSearch from "./SpaceSearch";
import TagList from "./TagList";

const Space = () => (
  <SpaceContext.Consumer>
    {props =>
      isReady(props.space) && (
        <Box>
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3
            }}
          >
            <Flex sx={{ alignItems: "center" }}>
              <Link href="/">
                <ArrowLeft />
              </Link>
              <Heading sx={{ marginLeft: 2 }}>
                <EditTextField
                  _id={props.space._id}
                  value="name"
                  label={props.space.name}
                  method="spaces.update"
                />
              </Heading>
            </Flex>
            <SpaceSearch />
          </Flex>
          <Box sx={{ mb: 3 }}>
            <AnimalList />
          </Box>
          <Box sx={{ mb: 3 }}>
            <FosterList />
          </Box>
          <TagList />
        </Box>
      )
    }
  </SpaceContext.Consumer>
);

export default Space;
