import { toast } from "react-toastify";
import Airtable from "airtable";
import AppContext from "./AppContext";
import { useState } from "react";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY
});

const AppProvider = props => {
  const [timestamp, setTimestamp] = useState("now");
  const [unit, setUnit] = useState("grams");

  const AirtableBase = Airtable.base("app0AK6Hi7kU1sG4P");

  const createWeights = weights => {
    const payload = weights.map(weight => {
      weight.Recorded = Date.now();

      return {
        fields: weight
      };
    });

    AirtableBase("Weights").create(payload, (error, records) => {
      error
        ? toast.error("Something went wrong")
        : toast.success("Weights added");
    });
  };

  const createWeight = (weight, id) => {
    const payload = [
      {
        fields: {
          Weight: parseInt(weight),
          Animal: [id],
          Recorded: timestamp === "now" ? Date.now() : timestamp
        }
      }
    ];

    AirtableBase("Weights").create(payload, (error, records) => {
      error
        ? toast.error("Something went wrong")
        : toast.success("Weight added");
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...props,
        AirtableBase,
        createWeights,
        createWeight,
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
