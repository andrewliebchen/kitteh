import { Box, Button, Input, Flex, Heading, Progress, Text } from "theme-ui";
import { useAnimal, useAirtable } from "./hooks";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "./AppContext";
import dayjs from "dayjs";
import TimeSelect from "./TimeSelect";
import Weight from "./Weight";
import UnitSelect from "./UnitSelect";
import { toast } from "react-toastify";

const columnWidths = ["15%", "10%", "75%"];

const Animal = props => {
  const { unit, timestamp } = useContext(AppContext);
  const [weight, setWeight] = useState("");
  const { animalId } = useParams();
  const { animal, weights } = useAnimal(animalId);
  const airtable = useAirtable();

  // TODO: Refresh data when new weight submitted
  // TODO: Breadcrumbs in header back to Foster
  // TODO: Links to siblings

  const createWeight = (weight, id) => {
    const payload = [
      {
        fields: {
          Weight: parseInt(weight),
          Animal: [id],
          Recorded: timestamp === "now" ? Date.now() : timestamp
        }
      }
    ];

    airtable("Weights").create(payload, (error, records) => {
      error
        ? toast.error("Something went wrong")
        : toast.success("Weight added");
    });
  };

  return (
    Object.keys(animal).length > 0 && (
      <Box p={3}>
        <Flex
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
        >
          <Heading>{animal.fields.Name}</Heading>
        </Flex>
        <Flex
          as="form"
          sx={{ alignItems: "center", gap: 2, mb: 3 }}
          onSubmit={event => {
            event.preventDefault();
            createWeight(weight, animal.id);
            setWeight("");
          }}
        >
          <Input
            type="number"
            step={0.01}
            defaultValue={weight}
            placeholder={`Add a new weight for ${animal.fields.Name}`}
            onChange={event => setWeight(event.target.value)}
          />
          <UnitSelect />
          <TimeSelect />
          <Button>Send</Button>
        </Flex>
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
                {dayjs(weight.fields.Recorded).format("h:mma [on] MMM D")}
              </Text>
              <Text
                sx={{
                  width: columnWidths[1],
                  textAlign: "right",
                  fontWeight: "bold"
                }}
              >
                <Weight value={weight.fields.Weight} />
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
