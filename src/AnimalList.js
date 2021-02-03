import { Box, Button, Flex, Input, Text } from "theme-ui";
import { Link } from "react-router-dom";
import { useAnimals, useAirtable } from "./hooks";
import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
import dayjs from "dayjs";
import Weight from "./Weight";
import { toast } from "react-toastify";

const AnimalList = props => {
  const { timestamp } = useContext(AppContext);
  const [weightsInput, setWeightsInput] = useState([]);
  const { animals, weights } = useAnimals(props.fosterName);
  const airtable = useAirtable();

  useEffect(
    () =>
      animals.length > 0 &&
      weightsInput.length === 0 &&
      setWeightsInput(
        animals.map(animal => {
          return { Animal: [animal.id], Weight: false };
        })
      )
  );

  const createWeights = weights => {
    const payload = weights.map(weight => {
      weight.Recorded = timestamp === "now" ? Date.now() : timestamp;

      return {
        fields: { ...weight, Recorded: timestamp }
      };
    });

    airtable("Weights").create(payload, (error, records) => {
      error
        ? toast.error("Something went wrong")
        : toast.success("Weights added");
    });
  };

  return (
    <Box>
      <Box
        as="form"
        onSubmit={event => {
          event.preventDefault();
          createWeights(weightsInput);
          setWeightsInput([]);
        }}
      >
        {weightsInput.map((weightInput, i) => {
          const lastWeight = weights.filter(
            weight => weightInput.Animal[0] === weight.fields.Animal[0]
          )[0];

          const animal = animals.find(
            animal => animal.id === weightInput.Animal[0]
          );

          return (
            <Flex
              key={weightInput.Animal}
              sx={{
                gap: 2,
                alignItems: "center",
                flexDirection: "column",
                pb: 3
              }}
            >
              <Flex sx={{ justifyContent: "space-between", width: "100%" }}>
                <Link to={`/animals/${weightInput.Animal}`}>
                  <Text sx={{ fontWeight: "bold" }}>{animal.fields.Name}</Text>
                </Link>
                {lastWeight && (
                  <Text>
                    Last weight <Weight value={lastWeight.fields.Weight} />{" "}
                    recorded at{" "}
                    {dayjs(lastWeight.fields.Recorded).format(
                      "h:mma [on] MMM D"
                    )}
                  </Text>
                )}
              </Flex>
              <Input
                type="number"
                placeholder={`Add a new weight for ${animal.fields.Name}`}
                onChange={event => {
                  weightsInput[i].Weight = parseInt(event.target.value);
                  setWeightsInput(weightsInput);
                }}
              />
            </Flex>
          );
        })}
        <Button
          as="input"
          type="submit"
          disabled={weightsInput.length === 0}
          value="Save"
        />
      </Box>
    </Box>
  );
};

export default AnimalList;
