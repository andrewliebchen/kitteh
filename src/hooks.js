import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";

export const useAirtableData = (table, query) => {
  const { AirtableBase } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      AirtableBase(table)
        .select({
          filterByFormula: query
        })
        .eachPage(
          function page(records, fetchNextPage) {
            setData(records);
            fetchNextPage();
          },
          function done(err) {
            err && console.error(err);
          }
        );
    }

    fetchAnimals();
  }, [AirtableBase, table, query]);

  return data;
};

// for weights `{ID} = "${animalId}"`
