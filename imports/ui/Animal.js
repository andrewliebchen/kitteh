import { ArrowLeft, Plus } from "react-feather";
import { Box, Heading, Flex, Text, Link } from "theme-ui";
import { isReady } from "../utils/helpers";
import AddTag from "./AddTag";
import AnimalContext from "./AnimalContext";
import BarRow from "./BarRow";
import dayjs from "dayjs";
import EditTextField from "./EditTextField";
import React from "react";
import RelativeTime from "dayjs/plugin/relativeTime";
import Tag from "./Tag";
import WeightInput from "./WeightInput";

dayjs.extend(RelativeTime);

const Animal = () => (
  <AnimalContext.Consumer>
    {props =>
      isReady(props.animal) && (
        <Box>
          <Flex sx={{ alignItems: "center" }}>
            <Link href={`/spaces/${props.match.params.spaceId}`}>
              <ArrowLeft />
            </Link>
            <Heading sx={{ marginLeft: 2 }}>
              <EditTextField
                _id={props.animal._id}
                value="name"
                label={props.animal.name}
                method="animals.update"
              />
            </Heading>
          </Flex>
          <Text>
            <b>Created At</b> {dayjs(props.animal.createdAt).fromNow()}
          </Text>
          <Text>
            <b>Updated At</b> {dayjs(props.animal.updatedAt).fromNow()}
          </Text>
          <Text>
            <b>Foster</b>{" "}
            {props.animal.fosterID || (
              <Link>
                <Plus />
              </Link>
            )}
          </Text>
          <Text>
            <b>Lifestage</b> {props.animal.lifestage}
          </Text>
          <Text>
            <b>Mother</b>{" "}
            {props.animal.motherId || (
              <Link>
                <Plus />
              </Link>
            )}
          </Text>
          <Text>
            <b>Species</b> {props.animal.species}
          </Text>
          <Flex sx={{ alignItems: "center" }}>
            <Text sx={{ fontWeight: "bold" }}>Tags</Text>
            {props.tags.length > 0 &&
              [...new Set(props.animal.tags)].map(animalTagId => {
                const tag = props.tags.find(tag => tag._id === animalTagId);
                return <Tag key={tag.createdAt} {...tag} />;
              })}
            <AddTag {...props} />
          </Flex>

          <Box sx={{ marginTop: 3 }}>
            <WeightInput {...props.animal} />
            {props.animal.weight.reverse().map(weight => (
              <BarRow key={weight.createdAt} {...weight} />
            ))}
          </Box>
        </Box>
      )
    }
  </AnimalContext.Consumer>
);

export default Animal;
