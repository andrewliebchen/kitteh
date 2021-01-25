import { useContext, useState } from "react";
import AppContext from "./AppContext";

const App = () => {
  const { animals, createWeight } = useContext(AppContext);
  const [weights, setWeights] = useState([]);

  return (
    <div>
      <h1>Kitteh</h1>
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

export default App;
