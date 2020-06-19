import React, { useState } from "react";
import { Input, Box, Label } from "theme-ui";

const InputField = props => {
  const [value, setValue] = useState(props.value);

  return (
    <Box>
      <Label>{props.label}</Label>
      <Input
        type={props.type}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      }
    </Box>
  );
};

export default InputField;
