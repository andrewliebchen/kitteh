import React, { useState } from "react";
import { Label, Box, Input, Select, Button } from "theme-ui";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

const lifestages = ["kitten", "adult"];
const types = ["cat", "dog"];

const AnimalForm = props => {
  const [args, setArgs] = useState({
    name: "",
    lifestage: "kitten",
    type: "cat"
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
      <Box>
        <Label>Lifestage</Label>
        <Select
          value={args.lifstage}
          onChange={event =>
            setArgs({ ...args, lifestage: event.target.value })
          }
        >
          {lifestages.map(stage => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Label>Type</Label>
        <Select
          value={args.type}
          onChange={event => setArgs({ ...args, type: event.target.value })}
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Box>
      <Button onClick={() => Meteor.call(props.method, args)}>Add</Button>
    </Box>
  );
};

AnimalForm.propTypes = {
  method: PropTypes.string
};

export default AnimalForm;
