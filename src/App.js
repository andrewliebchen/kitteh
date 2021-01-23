import { getAllAnimals, deleteAnimal, updateAnimal } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAllAnimals.then((res) => setAnimals(res));
  }, []);

  console.log(animals);

  return (
    <div>
      <h1>Kitteh</h1>
      {animals.map((animal) => (
        <div key={animal.ref.id}>{animal.data.name}</div>
      ))}
    </div>
  );
}

export default App;
