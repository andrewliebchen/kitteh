import React, { useState } from "react";
import { Text, Link, Box, Flex, Button, Heading, Input } from "theme-ui";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Animals } from "../api/animals";
import { Fosters } from "../api/fosters";
import dayjs from "dayjs";
import WeightInput from "./WeightInput";
import { toast } from "react-toastify";
import { Meteor } from "meteor/meteor";
import { ArrowLeft } from "react-feather";

const WeightWizard = props => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");

  let animal = props.animals[index];
  const isLast = index < props.animals.length - 1;
  const backHref = `/spaces/${props.match.params.spaceId}/fosters/${props.match.params.fosterId}`;

  return (
    <Box>
      {props.animals.length > 0 && (
        <Box>
          <Flex sx={{ alignItems: "center" }}>
            <Link href={backHref} sx={{ mr: 2 }}>
              <ArrowLeft />
            </Link>
            <Text>
              Recording weights for {dayjs(Date.now()).format("MMMM D")}
            </Text>
          </Flex>
          <Heading>How much does {animal.name} weigh?</Heading>
          <Input
            type="number"
            placeholder="Add a weight"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Button
            onClick={() =>
              Meteor.call(
                "animals.addWeight",
                animal._id,
                value,
                (err, success) => {
                  if (success) {
                    toast(`New weight added for ${animal.name}`, {
                      type: "success"
                    });
                    if (isLast) {
                      setIndex(index + 1);
                      setValue("");
                    } else {
                      window.location.href = backHref;
                    }
                  }
                }
              )
            }
          >
            Save and {isLast ? "Continue" : "Finish"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

WeightWizard.propTypes = {
  animals: PropTypes.array
};

export default withTracker(props => {
  let fosterId = props ? props.match.params.fosterId : "";

  return {
    animals: Animals.find({ fosterId: fosterId }).fetch(),
    foster: Fosters.findOne(fosterId)
  };
})(WeightWizard);
