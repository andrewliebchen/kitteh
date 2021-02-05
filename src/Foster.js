import AnimalList from "./AnimalList";
import { useParams } from "react-router-dom";
import { titleCase } from "title-case";
import { Avatar, Box, Flex, Heading } from "theme-ui";
import TimeSelect from "./TimeSelect";
import UnitSelect from "./UnitSelect";
import { useFoster } from "./hooks";

const Foster = props => {
  const { fosterName } = useParams();
  const formattedName = titleCase(fosterName.replace("-", " "));

  const foster = useFoster(formattedName);

  return (
    <Box p={3}>
      <Flex
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
      >
        <Flex sx={{ alignItems: "center", gap: 3 }}>
          {foster && foster.fields.Image.length > 0 && (
            <Avatar
              src={foster.fields.Image[0].url}
              sx={{ width: "avatar", height: "avatar" }}
            />
          )}
          <Heading>{formattedName}</Heading>
        </Flex>
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
