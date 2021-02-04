import AppContext from "./AppContext";
import { useState } from "react";

// TODO: Convert units to g when submitted
// Can the creation things move into the components?

const AppProvider = props => {
  const [timestamp, setTimestamp] = useState("now");
  const [unit, setUnit] = useState("grams");

  return (
    <AppContext.Provider
      value={{
        ...props,
        timestamp,
        setTimestamp,
        unit,
        setUnit
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
