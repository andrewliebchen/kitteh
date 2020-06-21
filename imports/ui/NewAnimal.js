import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import { Heading, Label, Box, Input, Select, Button } from "theme-ui";
import { Meteor } from "meteor/meteor";
import { toast } from "react-toastify";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React, { useState } from "react";

const lifestages = ["kitten", "adult"];
const types = ["cat", "dog"];
const defaultArgs = {
  name: "",
  lifestage: "kitten",
  type: "cat",
  motherId: "",
  fosterId: ""
};

const NewAnimal = props => {
  const [args, setArgs] = useState(defaultArgs);
  return (
    <Box>
      <Heading>New Animal</Heading>
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
      {args.lifestage === "kitten" && (
        <Box>
          <Label>Mother</Label>
          <Select
            value={args.motherId}
            onChange={event =>
              setArgs({ ...args, motherId: event.target.value })
            }
          >
            <option value="">Unknown</option>
            {props.animals
              .filter(
                animal => animal.type === "cat" && animal.lifestage === "adult"
              )
              .map(mother => (
                <option key={mother._id} value={mother._id}>
                  {mother.name}
                </option>
              ))}
          </Select>
        </Box>
      )}
      <Box>
        <Label>Foster</Label>
        <Select
          value={args.fosterId}
          onChange={event => setArgs({ ...args, fosterId: event.target.value })}
        >
          <option value="">Unknown</option>
          {props.fosters.map(foster => (
            <option key={foster._id} value={foster._id}>
              {foster.name}
            </option>
          ))}
        </Select>
      </Box>
      <Button
        onClick={() =>
          Meteor.call(
            "animals.insert",
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
    </Box>
  );
};

export default withTracker(props => {
  let spaceId = props ? props.match.params.id : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch(),
    fosters: Fosters.find({ spaceId: spaceId }).fetch()
  };
})(NewAnimal);
