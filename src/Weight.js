import { Text } from "theme-ui";
import { units } from "./helpers";
import { useContext } from "react";
import AppContext from "./AppContext";
import Decimal from "decimal.js-light";

const Weight = props => {
  const { unit } = useContext(AppContext);

  const unitMeta = units[unit];
  const value = new Decimal(
    unit === "grams" ? props.value : props.value * unitMeta.conversion
  );

  return (
    <Text sx={{ fontWeight: "bold", fontFamily: "monospace" }}>
      {value.toFixed(2).toString()}
      {unitMeta.short}
    </Text>
  );
};

export default Weight;
