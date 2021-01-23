import { getAllAnimals, deleteAnimal, updateAnimal } from "./api";
import { useEffect, useState } from "react";
import NewAnimal from "./NewAnimal";

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAllAnimals.then((res) => setAnimals(res));
  }, []);

  return (
    <div>
      <h1>Kitteh</h1>
      {animals.map((animal) => (
        <div key={animal.ref.id}>{animal.data.name}</div>
      ))}
      <NewAnimal animals={animals} setAnimals={setAnimals} />
    </div>
  );
}

export default App;
