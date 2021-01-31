import AnimalList from "./AnimalList";
import { useParams } from "react-router-dom";
import { titleCase } from "title-case";

const Foster = props => {
  const { fosterName } = useParams();
  const formattedName = titleCase(fosterName.replace("-", " "));

  return (
    <div>
      <h1>{formattedName}</h1>
      <AnimalList fosterName={formattedName} />
    </div>
  );
};

export default Foster;
