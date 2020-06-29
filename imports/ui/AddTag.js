import React, { useState } from "react";
import { Select, Box, Link, Flex, Button } from "theme-ui";
import { Plus } from "react-feather";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Tags } from "../api/tags";
import { toast } from "react-toastify";

const AddTag = props => {
  const [value, setValue] = useState(null);

  return (
    <Box>
      {value ? (
        <Flex>
          <Select onSelect={event => setValue(event.target.value)}>
            {props.tags.map(tag => (
              <option key={tag._id} value={tag._id}>
                {tag.label}
              </option>
            ))}
          </Select>
          <Button
            onClick={() => {
              Meteor.call(
                "animals.addTag",
                props.animal._id,
                value,
                (err, success) => {
                  if (success) {
                    toast("Tag added", { type: "success" });
                    setValue(null);
                  }
                }
              );
            }}
          >
            Add
          </Button>
        </Flex>
      ) : (
        <Link onClick={() => setValue(props.tags[0]._id)}>
          <Plus />
        </Link>
      )}
    </Box>
  );
};

AddTag.propTypes = {
  animal: PropTypes.object
};

export default withTracker(props => {
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    tags: Tags.find({ spaceId: spaceId }).fetch()
  };
})(AddTag);
