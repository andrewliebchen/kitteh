import AnimalList from "./AnimalList";
import { useParams } from "react-router-dom";

const Foster = (props) => {
  const { fosterName } = useParams();

  return (
    <div>
      <h1>Kitteh</h1>
      <AnimalList fosterName={fosterName} />
    </div>
  );
};

export default Foster;
