import { Button } from "theme-ui";
import { units } from "./helpers";
import { useContext } from "react";
import AppContext from "./AppContext";

const UnitSelect = props => {
  const { unit, setUnit } = useContext(AppContext);

  return (
    <Button
      variant="buttons.secondary"
      onClick={event => {
        event.preventDefault();
        setUnit(unit === "grams" ? "ounces" : "grams");
      }}
    >
      {units[unit].label}
    </Button>
  );
};

export default UnitSelect;
