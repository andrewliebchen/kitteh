import { useContext, useState, useEffect } from "react";
import Airtable from "airtable";
import AppContext from "./AppContext";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY
});

export const useAirtable = () =>
  Airtable.base(process.env.REACT_APP_AIRTABLE_BASE);

export const useAnimals = fosterName => {
  const [animals, setAnimals] = useState([]);
  const [weights, setWeights] = useState([]);
  const airtable = useAirtable();

  useEffect(() => {
    const query = {
      filterByFormula: `{Foster} = "${fosterName}"`
    };

    async function fetchWeights() {
      airtable("Weights")
        .select(query)
        .eachPage(function page(records, fetchNextPage) {
          setWeights(records);
          fetchNextPage();
        });
    }

    async function fetchAnimals() {
      airtable("Animals")
        .select(query)
        .eachPage(
          function page(records, fetchNextPage) {
            setAnimals(records);
            fetchNextPage();
          },
          function done(err) {
            err && console.error(err);
          }
        );
    }

    fetchWeights();
    fetchAnimals();
  }, [airtable, fosterName]);

  return { animals, weights };
};

export const useAnimal = animalId => {
  const [animal, setAnimal] = useState({});
  const [weights, setWeights] = useState([]);
  const airtable = useAirtable();

  useEffect(() => {
    async function fetchAnimal() {
      airtable("Animals").find(animalId, (error, record) => {
        setAnimal(record);
        airtable("Weights")
          .select({
            filterByFormula: `{Animal} = "${record.fields.Name}"`,
            sort: [{ field: "Recorded", direction: "asc" }]
          })
          .eachPage(function page(records, fetchNextPage) {
            setWeights(records);
            fetchNextPage();
          });
      });
    }

    fetchAnimal();
  }, [airtable, animalId]);

  return { animal, weights };
};

export const useFoster = fosterName => {
  const [foster, setFoster] = useState({});
  const { setUnit } = useContext(AppContext);
  const airtable = useAirtable();

  useEffect(() => {
    async function fetchFoster() {
      airtable("People")
        .select({
          filterByFormula: `{Name} = "${fosterName}"`
        })
        .eachPage(function page(records, fetchNextPage) {
          const foster = records[0];
          setFoster(foster);
          setUnit(foster.fields["Display units"]);
          fetchNextPage();
        });
    }

    fetchFoster();
  }, [airtable, fosterName, setUnit]);

  return foster;
};
