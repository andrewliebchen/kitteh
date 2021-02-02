import { Box, Input, Select } from "theme-ui";
import { useContext, useState } from "react";
import AppContext from "./AppContext";

const TimeSelect = () => {
  const { setTimestamp } = useContext(AppContext);
  const [type, setType] = useState("now");

  return (
    <Box sx={{ flexShrink: 0 }}>
      {type === "now" ? (
        <Select
          onChange={event => {
            setType(event.target.value);
            setTimestamp(Date.now());
          }}
        >
          <option value="now">Right now</option>
          <option value="custom">Custom time</option>
        </Select>
      ) : (
        <Input
          type="datetime-local"
          onChange={event => setTimestamp(event.target.value)}
        />
      )}
    </Box>
  );
};

export default TimeSelect;
