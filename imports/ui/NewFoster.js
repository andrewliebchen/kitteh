import { Heading, Label, Box, Input, Select, Button, Flex } from "theme-ui";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { useState } from "react";

const defaultArgs = {
  name: ""
};

const NewFoster = props => {
  const [args, setArgs] = useState(defaultArgs);
  return (
    <Box>
      <Heading>New Foster</Heading>
      <Box>
        <Label>Name</Label>
        <Input
          type="text"
          value={args.name}
          onChange={event => setArgs({ ...args, name: event.target.value })}
        />
      </Box>
      <Flex sx={{ alignItems: "center" }}>
        <Link to={`/spaces/${props.match.params.id}`}>Done</Link>
        <Button
          onClick={() =>
            Meteor.call(
              "fosters.insert",
              { spaceId: props.match.params.id, ...args },
              (err, success) => {
                success && toast("Done", { type: "success" });
                setArgs(defaultArgs);
              }
            )
          }
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default NewFoster;
