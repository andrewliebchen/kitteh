import React, { useState } from "react";
import { Box, Text, Input, Flex, Link } from "theme-ui";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

const EditField = props => {
  const [value, setValue] = useState("");

  return (
    <Box sx={{ mr: 2 }}>
      {value ? (
        <Flex sx={{ alignItems: "center" }}>
          <Input
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Link
            onClick={() => {
              let args = {};
              args[props.value] = value;
              Meteor.call(props.method, props._id, args, (err, success) => {
                success && toast("Saved", { type: "success" });
                setValue("");
              });
            }}
            sx={{ ml: 2 }}
          >
            💽
          </Link>
        </Flex>
      ) : (
        <Flex sx={{ alignItems: "center" }}>
          <Text sx={props.sx}>
            {props.link ? (
              <RouterLink to={props.link}>{props.label}</RouterLink>
            ) : (
              props.label
            )}
          </Text>
          <Link onClick={() => setValue(props.label)} sx={{ ml: 2 }}>
            ✏️
          </Link>
        </Flex>
      )}
    </Box>
  );
};

EditField.propTypes = {
  _id: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string,
  method: PropTypes.string,
  sx: PropTypes.object,
  value: PropTypes.string
};

export default EditField;
