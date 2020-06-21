import React, { useState } from "react";
import { Label, Box, Input, Select, Button } from "theme-ui";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

const FosterForm = props => {
  const [args, setArgs] = useState({
    name: ""
  });

  return (
    <Box>
      <Box>
        <Label>Name</Label>
        <Input
          type="text"
          value={args.name}
          onChange={event => setArgs({ ...args, name: event.target.value })}
        />
      </Box>

      <Button
        onClick={() =>
          Meteor.call(props.method, { spaceId: props.spaceId, ...args })
        }
      >
        Add
      </Button>
    </Box>
  );
};

FosterForm.propTypes = {
  method: PropTypes.func,
  spaceId: PropTypes.string
};

export default FosterForm;
