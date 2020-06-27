import { Box, Text, Input, Flex, Link } from "theme-ui";
import { Edit, Save, X } from "react-feather";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { useState } from "react";

const EditTextField = props => {
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
          <Link onClick={() => setValue("")} sx={{ ml: 2 }}>
            <X />
          </Link>
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
            <Save />
          </Link>
        </Flex>
      ) : (
        <Flex sx={{ alignItems: "center" }}>
          <Text sx={props.sx}>
            {props.link ? (
              <Link href={props.link}>{props.label}</Link>
            ) : (
              props.label
            )}
          </Text>
          <Link onClick={() => setValue(props.label)} sx={{ ml: 2 }}>
            <Edit />
          </Link>
        </Flex>
      )}
    </Box>
  );
};

EditTextField.propTypes = {
  _id: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string,
  method: PropTypes.string,
  sx: PropTypes.object,
  value: PropTypes.string
};

export default EditTextField;
