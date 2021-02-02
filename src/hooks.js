import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
import { useLocation } from "react-router-dom";

export const useAnimals = fosterName => {
  const { AirtableBase } = useContext(AppContext);
  const [animals, setAnimals] = useState([]);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const query = {
      filterByFormula: `{Foster} = "${fosterName}"`
    };

    async function fetchWeights() {
      AirtableBase("Weights")
        .select(query)
        .eachPage(function page(records, fetchNextPage) {
          setWeights(records);
          fetchNextPage();
        });
    }

    async function fetchAnimals() {
      AirtableBase("Animals")
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
  }, [AirtableBase, fosterName]);

  return { animals, weights };
};

export const useAnimal = animalId => {
  const { AirtableBase } = useContext(AppContext);
  const [animal, setAnimal] = useState({});
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    async function fetchAnimal() {
      AirtableBase("Animals").find(animalId, (error, record) => {
        setAnimal(record);
        AirtableBase("Weights")
          .select({
            filterByFormula: `{Animal} = "${record.fields.Name}"`,
            sort: [{ field: "Recorded", direction: "desc" }]
          })
          .eachPage(function page(records, fetchNextPage) {
            setWeights(records);
            fetchNextPage();
          });
      });
    }

    fetchAnimal();
  }, [AirtableBase, animalId]);

  return { animal, weights };
};

export const useFoster = fosterName => {
  const { AirtableBase, setUnit } = useContext(AppContext);
  const [foster, setFoster] = useState({});

  useEffect(() => {
    async function fetchFoster() {
      AirtableBase("People")
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
  }, [AirtableBase, fosterName]);

  return foster;
};
