import { titleCase } from "title-case";
import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";

const AnimalList = (props) => {
  const {
    animals,
    createWeight,
    AirtableBase,
    setAnimals,
    getWeights,
  } = useContext(AppContext);
  const [weights, setWeights] = useState([]);

  useEffect(
    () =>
      AirtableBase("Animals")
        .select({
          filterByFormula: `{Foster} = "${titleCase(
            props.fosterName.replace("-", " ")
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
        ),
    []
  );

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createWeight(weights);
        }}
      >
        {animals.map((animal) => {
          return (
            <div key={animal.id}>
              {animal.fields.Name}
              <input
                type="number"
                onChange={(event) =>
                  setWeights(
                    weights.concat({
                      Animal: [animal.id],
                      Weight: parseInt(event.target.value),
                    })
                  )
                }
              />
            </div>
          );
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AnimalList;
