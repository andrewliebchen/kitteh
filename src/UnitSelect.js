import { Link } from "theme-ui";
import { useContext, useEffect } from "react";
import AppContext from "./AppContext";
import { units } from "./helpers";

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
