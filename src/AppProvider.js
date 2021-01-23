import AppContext from "./AppContext";
import { useState, useEffect } from "react";
import { getAllAnimals, createAnimal } from "./api";

const AppProvider = (props) => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAllAnimals.then((res) => setAnimals(res));
  }, []);

  return (
    <AppContext.Provider
      value={{
        createAnimal,
        animals,
        setAnimals,
        ...props,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
