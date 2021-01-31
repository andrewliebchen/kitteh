import { useParams } from "react-router-dom";
import { useAnimal } from "./hooks";
import dayjs from "dayjs";

const Animal = props => {
  const { animalId } = useParams();
  const { animal, weights } = useAnimal(animalId);

  return (
    Object.keys(animal).length > 0 && (
      <div>
        <h1>{animal.fields.Name}</h1>
        {weights.map(weight => (
          <div key={weight.id}>
            {weight.fields.Weight}
            <small>
              {dayjs(weight.fields.Created).format("dddd MMM M [at] h:mm a")}
            </small>
          </div>
        ))}
      </div>
    )
  );
};

export default Animal;
