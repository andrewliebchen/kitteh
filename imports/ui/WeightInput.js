import { Flex, Box, Input, Link } from "theme-ui";
import { Plus } from "react-feather";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { useState } from "react";

const WeightInput = props => {
  const [value, setValue] = useState("");
  return (
    <Flex sx={{ alignItems: "center" }}>
      <Input
        type="number"
        placeholder="Add a weight"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Link
        sx={{ ml: 2 }}
        onClick={() =>
          Meteor.call("animals.addWeight", props._id, value, (err, success) => {
            if (success) {
              toast("Weight added", { type: "success" });
              setValue("");
            }
          })
        }
      >
        <Plus />
      </Link>
    </Flex>
  );
};

WeightInput.propTypes = {
  _id: PropTypes.string
};

export default WeightInput;
