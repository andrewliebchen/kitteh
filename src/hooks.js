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

  const query = {
    filterByFormula: `{Foster} = "${fosterName}"`
  };

  const fetchWeights = async () => {
    await airtable("Weights")
      .select(query)
      .eachPage(function page(records, fetchNextPage) {
        setWeights(records);
        fetchNextPage();
      });
  };

  const fetchAnimals = async () => {
    await airtable("Animals")
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
  };

  useEffect(() => {
    fetchWeights();
    fetchAnimals();
  }, []);

  return { animals, weights };
};

export const useAnimal = animalId => {
  const [animal, setAnimal] = useState(false);
  const [weights, setWeights] = useState([]);
  const airtable = useAirtable();

  const fetchAnimal = async () => {
    await airtable("Animals").find(animalId, (error, record) => {
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
  };

  useEffect(() => {
    fetchAnimal();
  }, []);

  return { animal, weights };
};

export const useFoster = fosterName => {
  const [foster, setFoster] = useState(false);
  const airtable = useAirtable();

  const fetchFoster = async () => {
    await airtable("People")
      .select({
        filterByFormula: `{Name} = "${fosterName}"`
      })
      .eachPage(function page(records, fetchNextPage) {
        const foster = records[0];
        setFoster(foster);
        fetchNextPage();
      });
  };

  useEffect(() => fetchFoster(), []);

  return foster;
};
