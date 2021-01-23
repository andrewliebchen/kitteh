import { useContext } from "react";
import AppContext from "./AppContext";
import NewAnimal from "./NewAnimal";

const App = () => {
  const { animals } = useContext(AppContext);

  return (
    <div>
      <h1>Kitteh</h1>
      {animals.map((animal) => (
        <div key={animal.ref.id}>{animal.data.name}</div>
      ))}
      <NewAnimal />
    </div>
  );
};

export default App;
