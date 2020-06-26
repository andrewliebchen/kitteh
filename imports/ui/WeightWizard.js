import React, { useState } from "react";
import { Text, Link, Box, Flex, Button } from "theme-ui";
import PropTypes from "prop-types";

const WeightWizard = props => {
  const [index, setIndex] = useState(-1);
  let animal = props.animals[index];

  return (
    <Box>
      {index >= 0 ? (
        <Box>
          <Text>{animal.name}</Text>
          <Link onClick={() => setIndex(index + 1)}>Next</Link>
        </Box>
      ) : (
        <Button onClick={() => setIndex(0)}>Add weights</Button>
      )}
    </Box>
  );
};

WeightWizard.propTypes = {
  animals: PropTypes.array
};

export default WeightWizard;
