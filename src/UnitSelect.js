import { Link } from "theme-ui";
import { units } from "./helpers";
import { useContext } from "react";
import AppContext from "./AppContext";

const UnitSelect = props => {
  const { unit, setUnit } = useContext(AppContext);

  return (
    <Link
      variant="buttons.secondary"
      onClick={() => setUnit(unit === "grams" ? "ounces" : "grams")}
    >
      {units[unit].label}
    </Link>
  );
};

export default UnitSelect;
