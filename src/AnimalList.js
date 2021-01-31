import { useAnimals } from "./hooks";
import { useContext, useState } from "react";
import AppContext from "./AppContext";
import TimeAgo from "timeago-react";

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
              <div>{animal.fields.Name}</div>
              {lastWeight && (
                <small>
                  Last weight {lastWeight.fields.Weight} recorded at{" "}
                  <TimeAgo datetime={lastWeight.fields.Created} />
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
