import { units } from "./helpers";
import { useContext } from "react";
import AppContext from "./AppContext";

const Weight = props => {
  const { unit } = useContext(AppContext);

  const unitMeta = units[unit];
  const value = props.value * unitMeta.conversion;

  return (
    <b>
      {value}
      {unitMeta.short}
    </b>
  );
};

export default Weight;
