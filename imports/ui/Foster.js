import { Animals } from "../api/animals";
import { ArrowLeft } from "react-feather";
import { Box, Heading, Flex, Link, Text } from "theme-ui";
import { Fosters } from "../api/fosters";
import { withTracker } from "meteor/react-meteor-data";
import AnimalTable from "./AnimalTable";
import BarRow from "./BarRow";
import dayjs from "dayjs";
import EditTextField from "./EditTextField";
import React from "react";
import sortBy from "lodash.sortby";

const Foster = props => {
  let weights = [];
  props.animals.map(animal =>
    animal.weight.map(weight =>
      weights.push({ _id: animal._id, name: animal.name, ...weight })
    )
  );

  return (
    <Box>
      {typeof props.foster !== "undefined" && (
        <Box>
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3
            }}
          >
            <Flex sx={{ alignItems: "center" }}>
              <Link href={`/spaces/${props.match.params.spaceId}`}>
                <ArrowLeft />
              </Link>
              <Heading sx={{ marginLeft: 2 }}>
                <EditTextField
                  _id={props.foster._id}
                  value="name"
                  label={props.foster.name}
                  method="fosters.update"
                />
              </Heading>
            </Flex>
          </Flex>
          <Box sx={{ mb: 3 }}>
            <Heading>Animals</Heading>
            <AnimalTable {...props} />
          </Box>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Heading>Weights</Heading>
            <Link
              href={`/spaces/${props.match.params.spaceId}/fosters/${props.foster._id}/weights`}
            >
              Add weights
            </Link>
          </Flex>
          {sortBy(weights, "createdAt")
            .reverse()
            .map(weight => (
              <BarRow key={weight.createdAt} {...weight} />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default withTracker(props => {
  let fosterId = props ? props.match.params.fosterId : "";

  return {
    animals: Animals.find({ fosterId: fosterId }).fetch(),
    foster: Fosters.findOne(fosterId)
  };
})(Foster);
