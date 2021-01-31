import { useContext, useState } from "react";
import AppContext from "./AppContext";
import { useAirtableData } from "./hooks";
import { titleCase } from "title-case";

const AnimalList = props => {
  const { createWeights } = useContext(AppContext);
  const animals = useAirtableData(
    "Animals",
    `{Foster} = "${titleCase(props.fosterName.replace("-", " "))}"`
  );
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
          return (
            <div key={animal.id}>
              {animal.fields.Name}
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
          );
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AnimalList;
