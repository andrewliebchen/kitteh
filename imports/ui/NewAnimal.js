import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import { Heading, Box, Select, Button, Flex, Field } from "theme-ui";
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
      <Field
        type="text"
        label="Name"
        value={args.name}
        onChange={event => setArgs({ ...args, name: event.target.value })}
      />
      <Field
        as={Select}
        label="Lifestage"
        value={args.lifstage}
        onChange={event => setArgs({ ...args, lifestage: event.target.value })}
      >
        {lifestagesTypes.map(stage => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </Field>
      <Field
        as={Select}
        label="Species"
        value={args.species}
        onChange={event => setArgs({ ...args, species: event.target.value })}
      >
        {speciesTypes.map(species => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </Field>
      {args.lifestage === "juvenile" && (
        <Field
          as={Select}
          label="Mother"
          value={args.motherId}
          onChange={event => setArgs({ ...args, motherId: event.target.value })}
        >
          <option value="">Unknown</option>
          {props.animals
            .filter(
              animal => animal.species === "cat" && animal.lifestage === "adult"
            )
            .map(mother => (
              <option key={mother._id} value={mother._id}>
                {mother.name}
              </option>
            ))}
        </Field>
      )}
      <Field
        as={Select}
        label="Foster"
        value={args.fosterId}
        onChange={event => setArgs({ ...args, fosterId: event.target.value })}
      >
        <option value="">Unknown</option>
        {props.fosters.map(foster => (
          <option key={foster._id} value={foster._id}>
            {foster.name}
          </option>
        ))}
      </Field>
      <Flex sx={{ alignItems: "center" }}>
        <Link to={`/spaces/${props.match.params.spaceId}`}>Done</Link>
        <Button
          onClick={() =>
            Meteor.call(
              "animals.insert",
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
  );
};

export default withTracker(props => {
  let spaceId = props ? props.match.params.spaceId : "";

  return {
    animals: Animals.find({ spaceId: spaceId }).fetch(),
    fosters: Fosters.find({ spaceId: spaceId }).fetch()
  };
})(NewAnimal);
