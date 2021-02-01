import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";

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

// for weights `{ID} = "${animalId}"`
