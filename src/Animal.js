import { useParams } from "react-router-dom";
import { useAnimal } from "./hooks";
import dayjs from "dayjs";
import { Progress } from "theme-ui";

const Animal = props => {
  const { animalId } = useParams();
  const { animal, weights } = useAnimal(animalId);

  return (
    Object.keys(animal).length > 0 && (
      <div>
        <h1>{animal.fields.Name}</h1>
        <table>
          <thead>
            <tr>
              <th>Weight</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {weights.map(weight => (
              <tr key={weight.id}>
                <td>{weight.fields.Weight}</td>
                <td>
                  {dayjs(weight.fields.Created).format("h:mma [on] MMM D")}
                </td>
                <td width={500}>
                  <Progress max={10} value={weight.fields.Weight} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Animal;
