import { Box, Flex, Text, Progress } from "theme-ui";
import dayjs from "dayjs";
import Weight from "./Weight";

const columnWidths = ["10%", "10%", "10%", "70%"];

const WeightsList = props => (
  <Box>
    <Flex sx={{ gap: 3, textDecoration: "underline" }}>
      <Text sx={{ width: columnWidths[0] }}>Date</Text>
      <Text sx={{ width: columnWidths[1] }}>Time</Text>
      <Text sx={{ width: columnWidths[2], textAlign: "right" }}>Weight</Text>
      <Flex sx={{ width: columnWidths[3] }} />
    </Flex>
    {props.weights.map(weight => (
      <Flex key={weight.id} sx={{ gap: 3, alignItems: "center" }}>
        <Text sx={{ width: columnWidths[0] }}>
          {dayjs(weight.fields.Recorded).format("ddd, MMM D")}
        </Text>
        <Text sx={{ width: columnWidths[1] }}>
          {dayjs(weight.fields.Recorded).format("h:mma")}
        </Text>
        <Text
          sx={{
            width: columnWidths[2],
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          <Weight value={weight.fields.Weight} />
        </Text>
        <Progress
          max={10}
          value={weight.fields.Weight}
          sx={{ bg: "muted", width: columnWidths[3] }}
        />
      </Flex>
    ))}
  </Box>
);

export default WeightsList;
