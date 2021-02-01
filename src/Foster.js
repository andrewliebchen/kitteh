import AnimalList from "./AnimalList";
import { useParams } from "react-router-dom";
import { titleCase } from "title-case";
import { Box, Heading } from "theme-ui";

const Foster = props => {
  const { fosterName } = useParams();
  const formattedName = titleCase(fosterName.replace("-", " "));

  return (
    <Box p={3}>
      <Heading>{formattedName}</Heading>
      <AnimalList fosterName={formattedName} />
    </Box>
  );
};

export default Foster;
