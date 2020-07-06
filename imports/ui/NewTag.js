import { Heading, Box, Field, Button, Flex } from "theme-ui";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { toast } from "react-toastify";
import React, { useState } from "react";
import theme from "../utils/theme";

const defaultArgs = {
  label: "",
  color: theme.colors.primary
};

const NewTag = props => {
  const [args, setArgs] = useState(defaultArgs);
  return (
    <Box>
      <Heading>New Tag</Heading>
      <Field
        label="Label"
        type="text"
        value={args.label}
        onChange={event => setArgs({ ...args, label: event.target.value })}
      />
      <Field
        label="Color"
        type="color"
        value={args.color}
        onChange={event => setArgs({ ...args, color: event.target.value })}
      />
      <Flex sx={{ alignItems: "center" }}>
        <Link to={`/spaces/${props.match.params.spaceId}`}>Done</Link>
        <Button
          onClick={() =>
            Meteor.call(
              "tags.insert",
              { spaceId: props.match.params.spaceId, ...args },
              (err, success) => {
                console.log(err);
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

export default NewTag;
