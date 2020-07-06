import { Heading, Label, Box, Field, Button, Flex } from "theme-ui";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { useState } from "react";

const defaultArgs = {
  name: ""
};

const NewSpace = props => {
  const [args, setArgs] = useState(defaultArgs);
  return (
    <Box>
      <Heading>New Space</Heading>
      <Field
        label="Name"
        type="text"
        value={args.name}
        onChange={event => setArgs({ ...args, name: event.target.value })}
      />
      <Flex sx={{ alignItems: "center" }}>
        <Button
          onClick={() =>
            Meteor.call("spaces.insert", args, (err, success) => {
              success && toast("Done", { type: "success" });
              setArgs(defaultArgs);
              window.location.href = `/spaces/${success}`;
            })
          }
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default NewSpace;
