import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
import { titleCase } from "title-case";

export const useAnimals = fosterName => {
  const { AirtableBase } = useContext(AppContext);
  const [animals, setAnimals] = useState([]);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const query = {
      filterByFormula: `{Foster} = "${titleCase(fosterName.replace("-", " "))}"`
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

// for weights `{ID} = "${animalId}"`
