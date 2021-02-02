import AnimalList from "./AnimalList";
import { useParams } from "react-router-dom";
import { titleCase } from "title-case";
import { Box, Flex, Heading } from "theme-ui";
import TimeSelect from "./TimeSelect";
import UnitSelect from "./UnitSelect";

const Foster = props => {
  const { fosterName } = useParams();
  const formattedName = titleCase(fosterName.replace("-", " "));

  return (
    <Box p={3}>
      <Flex
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
      >
        <Heading>{formattedName}</Heading>
        <Flex sx={{ alignItems: "center", gap: 3 }}>
          <UnitSelect />
          <TimeSelect />
        </Flex>
      </Flex>
      <AnimalList fosterName={formattedName} />
    </Box>
  );
};

export default Foster;
