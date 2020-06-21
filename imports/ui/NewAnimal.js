import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import { Heading, Label, Box, Input, Select, Button, Flex } from "theme-ui";
import { lifestagesTypes, speciesTypes } from "../utils/types";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { toast } from "react-toastify";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React, { useState } from "react";

const defaultArgs = {
  name: "",
  lifestage: lifestagesTypes[0],
  species: speciesTypes[0],
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
          {lifestagesTypes.map(stage => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Label>Species</Label>
        <Select
          value={args.species}
          onChange={event => setArgs({ ...args, species: event.target.value })}
        >
          {speciesTypes.map(species => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </Select>
      </Box>
      {args.lifestage === "juvenile" && (
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
                animal =>
                  animal.species === "cat" && animal.lifestage === "adult"
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
      <Flex sx={{ alignItems: "center" }}>
        <Link to={`/spaces/${props.match.params.id}`}>Done</Link>
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
      </Flex>
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
