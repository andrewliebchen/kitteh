import { useParams } from "react-router-dom";
import { useAnimal } from "./hooks";
import dayjs from "dayjs";
import { Box, Flex, Heading, Progress, Text } from "theme-ui";

const columnWidths = ["15%", "10%", "75%"];

const Animal = props => {
  const { animalId } = useParams();
  const { animal, weights } = useAnimal(animalId);

  return (
    Object.keys(animal).length > 0 && (
      <Box p={3}>
        <Heading>{animal.fields.Name}</Heading>
        <Box>
          <Flex sx={{ gap: 3, textDecoration: "underline" }}>
            <Text sx={{ width: columnWidths[0] }}>Date</Text>
            <Text sx={{ width: columnWidths[1], textAlign: "right", pr: 2 }}>
              Weight
            </Text>
          </Flex>
          {weights.map(weight => (
            <Flex key={weight.id} sx={{ gap: 3, alignItems: "center" }}>
              <Text sx={{ width: columnWidths[0] }}>
                {dayjs(weight.fields.Created).format("h:mma [on] MMM D")}
              </Text>
              <Text
                sx={{
                  width: columnWidths[1],
                  textAlign: "right",
                  fontWeight: "bold"
                }}
              >
                {weight.fields.Weight}
              </Text>
              <Progress
                max={10}
                value={weight.fields.Weight}
                sx={{ bg: "muted", width: columnWidths[2] }}
              />
            </Flex>
          ))}
        </Box>
      </Box>
    )
  );
};

export default Animal;
