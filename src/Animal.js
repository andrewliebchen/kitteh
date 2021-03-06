import { Avatar, Box, Button, Input, Flex, Heading } from "theme-ui";
import { toast } from "react-toastify";
import { useAnimal, useAirtable } from "./hooks";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "./AppContext";
import TimeSelect from "./TimeSelect";
import UnitSelect from "./UnitSelect";
import WeightsChart from "./WeightsChart";
import WeightsTable from "./WeightsTable";

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
    const weightInt = parseInt(weight, 10);
    const weightInGrams = unit === "grams" ? weightInt : weightInt * 28.35;

    const payload = [
      {
        fields: {
          Weight: weightInGrams,
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

    setWeight(false);
  };

  return (
    Object.keys(animal).length > 0 && (
      <Box p={3}>
        <Flex sx={{ alignItems: "center", mb: 3, gap: 3 }}>
          {animal.fields.Image.length > 0 && (
            <Avatar
              src={animal.fields.Image[0].url}
              sx={{ width: "avatar", height: "avatar" }}
            />
          )}
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
            value={weight}
            placeholder={`Add a new weight for ${animal.fields.Name}`}
            onChange={event => setWeight(event.target.value)}
          />
          <UnitSelect />
          <TimeSelect />
          <Button>Send</Button>
        </Flex>
        <WeightsChart weights={weights} />
        <WeightsTable weights={weights} />
      </Box>
    )
  );
};

export default Animal;
