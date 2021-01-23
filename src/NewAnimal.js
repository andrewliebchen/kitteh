import { useState } from "react";
import { createAnimal } from "./api";

const NewAnimal = ({ animals, setAnimals }) => {
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
