import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";

const AnimalList = (props) => {
  const { animals, createWeight, getAnimals } = useContext(AppContext);
  const [weights, setWeights] = useState([]);

  useEffect(() => getAnimals(props.fosterName));

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createWeight(weights);
        }}
      >
        {animals.map((animal) => (
          <div key={animal.id}>
            {animal.fields.Name}
            <input
              type="number"
              onChange={(event) =>
                setWeights(
                  weights.concat({
                    Animal: [animal.id],
                    Weight: parseInt(event.target.value),
                  })
                )
              }
            />
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AnimalList;
