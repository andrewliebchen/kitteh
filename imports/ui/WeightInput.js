import React, { useState } from "react";
import { Flex, Box, Link } from "theme-ui";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const WeightInput = props => {
  const [value, setValue] = useState("");
  return (
    <Flex sx={{ alignItems: "center" }}>
      <input
        type="number"
        placeholder="Add a weight"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Box sx={{ marginLeft: 2, marginRight: 2 }}>
        <Link
          onClick={() =>
            Meteor.call(
              "animals.addWeight",
              props._id,
              value,
              (err, success) => {
                if (success) {
                  toast("Weight added", { type: "success" });
                  setValue("");
                }
              }
            )
          }
        >
          Add
        </Link>
      </Box>
    </Flex>
  );
};

WeightInput.propTypes = {
  _id: PropTypes.string
};

export default WeightInput;
