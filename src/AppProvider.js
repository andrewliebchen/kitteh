import { toast } from "react-toastify";
import { useState } from "react";
import Airtable from "airtable";
import AppContext from "./AppContext";
import { titleCase } from "title-case";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY,
});

const AppProvider = (props) => {
  const [fosterName, setFosterName] = useState("");
  const [animals, setAnimals] = useState([]);

  const getAnimals = (fosterName) =>
    Airtable.base("app0AK6Hi7kU1sG4P")("Animals")
      .select({
        filterByFormula: `{Foster} = "${titleCase(
          fosterName.replace("-", " ")
        )}"`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          setAnimals(records);
          fetchNextPage();
        },
        function done(err) {
          err && console.error(err);
        }
      );

  const createWeight = (weights) => {
    const payload = weights.map((weight) => {
      return {
        fields: weight,
      };
    });

    Airtable.base("app0AK6Hi7kU1sG4P")("Weights").create(
      payload,
      (error, records) => {
        error
          ? toast.error("Something went wrong")
          : toast.success("Weights added");
      }
    );
  };

  return (
    <AppContext.Provider
      value={{
        animals,
        getAnimals,
        createWeight,
        setAnimals,
        fosterName,
        setFosterName,
        ...props,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
