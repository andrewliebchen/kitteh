import { Link } from "react-router-dom";
import { useAnimals } from "./hooks";
import { useContext, useState } from "react";
import AppContext from "./AppContext";
import dayjs from "dayjs";

const AnimalList = props => {
  const { createWeights } = useContext(AppContext);
  const { animals, weights } = useAnimals(props.fosterName);
  const [weightsInput, setWeightsInput] = useState([]);

  return (
    <div>
      <form
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
            <div key={animal.id}>
              <div>
                <Link to={`/animals/${animal.id}`}>{animal.fields.Name}</Link>
              </div>
              {lastWeight && (
                <small>
                  Last weight {lastWeight.fields.Weight} recorded at{" "}
                  {dayjs(lastWeight.fields.Created).format("h:mma [on] MMM D")}
                </small>
              )}
              <div>
                <input
                  type="number"
                  onChange={event =>
                    setWeightsInput(
                      weightsInput.concat({
                        Animal: [animal.id],
                        Weight: parseInt(event.target.value)
                      })
                    )
                  }
                />
              </div>
            </div>
          );
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AnimalList;
