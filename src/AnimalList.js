import { ToastContainer } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
import { useParams } from "react-router-dom";

const AnimalList = (props) => {
  const { fosterName } = useParams();
  const { animals, createWeight, getAnimals } = useContext(AppContext);
  const [weights, setWeights] = useState([]);

  useEffect(() => getAnimals(fosterName), []);

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
      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default AnimalList;
