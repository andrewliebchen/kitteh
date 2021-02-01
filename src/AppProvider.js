import { toast } from "react-toastify";
import Airtable from "airtable";
import AppContext from "./AppContext";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY
});

const AppProvider = props => {
  const AirtableBase = Airtable.base("app0AK6Hi7kU1sG4P");

  const createWeights = weights => {
    const payload = weights.map(weight => {
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
    const payload = {
      fields: weight,
      Animal: id
    };

    AirtableBase("Weights").create(payload, (error, records) => {
      error
        ? toast.error("Something went wrong")
        : toast.success("Weights added");
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...props,
        AirtableBase,
        createWeights,
        createWeight
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
