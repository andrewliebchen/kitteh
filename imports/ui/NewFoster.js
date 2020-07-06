import { Heading, Box, Field, Button, Flex } from "theme-ui";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { toast } from "react-toastify";
import React, { useState } from "react";
import SpaceContext from "./SpaceContext";

const defaultArgs = {
  name: ""
};

const NewFoster = () => {
  const [args, setArgs] = useState(defaultArgs);
  return (
    <SpaceContext.Consumer>
      {props => (
        <Box>
          <Heading>New Foster</Heading>
          <Field
            label="Name"
            type="text"
            value={args.name}
            onChange={event => setArgs({ ...args, name: event.target.value })}
          />
          <Flex sx={{ alignItems: "center" }}>
            <Link to={`/spaces/${props.match.params.spaceId}`}>Done</Link>
            <Button
              onClick={() =>
                Meteor.call(
                  "fosters.insert",
                  { spaceId: props.match.params.spaceId, ...args },
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
      )}
    </SpaceContext.Consumer>
  );
};

export default NewFoster;
