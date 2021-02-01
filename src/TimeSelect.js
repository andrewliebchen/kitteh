import { Box, Input, Select } from "theme-ui";
import { useContext, useState } from "react";
import AppContext from "./AppContext";
import dayjs from "dayjs";

const TimeSelect = () => {
  const { weightTimestamp, setWeightTimestamp } = useContext(AppContext);
  const [type, setType] = useState("now");

  return (
    <Box sx={{ width: "25%" }}>
      {type === "now" ? (
        <Select
          sx={{ width: "100%" }}
          onChange={event => {
            setType(event.target.value);
            setWeightTimestamp(Date.now());
          }}
        >
          <option value="now">Right now</option>
          <option value="custom">Custom time</option>
        </Select>
      ) : (
        <Input
          type="datetime-local"
          onChange={event => setWeightTimestamp(event.target.value)}
        />
      )}
    </Box>
  );
};

export default TimeSelect;
