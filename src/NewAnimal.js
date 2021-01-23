import { useState, useContext } from "react";
import AppContext from "./AppContext";

const NewAnimal = () => {
  const { animals, setAnimals, createAnimal } = useContext(AppContext);
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        createAnimal({ name: value }).then((response) => {
          const newAnimalsArray = animals.concat([response]);
          setAnimals(newAnimalsArray);
          setValue("");
        });
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};

export default NewAnimal;
