import { Animals } from "../api/animals";
import { ArrowLeft } from "react-feather";
import { Box, Heading, Flex, Text, Link, Select } from "theme-ui";
import { Fosters } from "../api/fosters";
import { Plus } from "react-feather";
import { withTracker } from "meteor/react-meteor-data";
import Bar from "./Bar";
import dayjs from "dayjs";
import EditTextField from "./EditTextField";
import React from "react";
import WeightInput from "./WeightInput";
import RelativeTime from "dayjs/plugin/relativeTime";
import Tag from "./Tag";
import { Tags } from "../api/tags";
import AddTag from "./AddTag";

dayjs.extend(RelativeTime);

const Animal = props => (
  <Box>
    {typeof props.animal !== "undefined" && (
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
          {props.animal.tags &&
            [...new Set(props.animal.tags)].map(animalTagId => {
              const tag = props.tags.find(tag => tag._id === animalTagId);
              return <Tag {...tag} />;
            })}
          <AddTag {...props} />
        </Flex>

        <Box sx={{ marginTop: 3 }}>
          <WeightInput {...props.animal} />
          {props.animal.weight.reverse().map(weight => (
            <Flex key={weight.createdAt} sx={{ alignItems: "center" }}>
              <Text sx={{ width: 300 }}>
                <b>{weight.createdAt}</b> {weight.value}
              </Text>
              <Bar value={weight.value} />
            </Flex>
          ))}
        </Box>
      </Box>
    )}
  </Box>
);

export default withTracker(props => {
  let animalId = props ? props.match.params.animalId : "";
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    animal: Animals.findOne(animalId),
    tags: Tags.find({ spaceId: spaceId }).fetch()
  };
})(Animal);
