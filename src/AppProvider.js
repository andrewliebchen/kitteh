import { toast } from "react-toastify";
import { useState } from "react";
import Airtable from "airtable";
import AppContext from "./AppContext";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY,
});

const AppProvider = (props) => {
  const [animals, setAnimals] = useState([]);

  const AirtableBase = Airtable.base("app0AK6Hi7kU1sG4P");

  const createWeight = (weights) => {
    const payload = weights.map((weight) => {
      return {
        fields: weight,
      };
    });

    AirtableBase("Weights").create(payload, (error, records) => {
      error
        ? toast.error("Something went wrong")
        : toast.success("Weights added");
    });
  };

  const getWeights = (animalId) =>
    AirtableBase("Weights")
      .select({
        filterByFormula: `{ID} = "${animalId}"`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          return records;
          fetchNextPage();
        },
        function done(err) {
          err && console.error(err);
        }
      );

  return (
    <AppContext.Provider
      value={{
        ...props,
        AirtableBase,
        animals,
        createWeight,
        getWeights,
        setAnimals,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
