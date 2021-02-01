import { Link } from "react-router-dom";
import { useAnimals } from "./hooks";
import { useContext, useState } from "react";
import AppContext from "./AppContext";
import dayjs from "dayjs";
import { Box, Button, Flex, Input, Text } from "theme-ui";

const AnimalList = props => {
  const { createWeights } = useContext(AppContext);
  const { animals, weights } = useAnimals(props.fosterName);
  const [weightsInput, setWeightsInput] = useState([]);

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
        {animals.map(animal => {
          const lastWeight = weights.filter(
            weight => animal.id === weight.fields.Animal[0]
          )[0];

          return (
            <Flex
              key={animal.id}
              sx={{
                gap: 2,
                alignItems: "center",
                flexDirection: "column",
                pb: 3
              }}
            >
              <Flex sx={{ justifyContent: "space-between", width: "100%" }}>
                <Link to={`/animals/${animal.id}`}>
                  <Text sx={{ fontWeight: "bold" }}>{animal.fields.Name}</Text>
                </Link>
                {lastWeight && (
                  <Text>
                    Last weight {lastWeight.fields.Weight} recorded at{" "}
                    {dayjs(lastWeight.fields.Created).format(
                      "h:mma [on] MMM D"
                    )}
                  </Text>
                )}
              </Flex>
              <Input
                type="number"
                placeholder={`Add a new weight for ${animal.fields.Name}`}
                onChange={event =>
                  setWeightsInput(
                    weightsInput.concat({
                      Animal: [animal.id],
                      Weight: parseInt(event.target.value)
                    })
                  )
                }
              />
            </Flex>
          );
        })}
        <Button disabled={weightsInput.length === 0}>Save</Button>
      </Box>
    </Box>
  );
};

export default AnimalList;
