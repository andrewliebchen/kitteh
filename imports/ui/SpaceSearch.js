import { Flex, Input, Link, Box, Text, Card } from "theme-ui";
import { Search, X } from "react-feather";
import React, { useState } from "react";
import SpaceContext from "./SpaceContext";

const SpaceSearch = () => {
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <SpaceContext.Consumer>
      {props => {
        let elements = [];
        props.animals.map(animal =>
          elements.push({ type: "animal", ...animal })
        );
        props.fosters.map(foster =>
          elements.push({ type: "foster", ...foster })
        );

        return visible ? (
          <Box sx={{ width: 400, position: "relative" }}>
            <Flex sx={{ alignItems: "center" }}>
              <Input
                type="search"
                placeholder="Search..."
                sx={{ width: 600 }}
                onChange={event => {
                  if (event.target.value.length > 2) {
                    setResults(
                      elements.filter(element =>
                        element.name
                          .toLowerCase()
                          .includes(event.target.value.toLowerCase())
                      )
                    );
                  } else {
                    setResults([]);
                  }
                }}
              />
              <Link onClick={() => setVisible(false)} sx={{ ml: 2 }}>
                <X />
              </Link>
            </Flex>
            {results.length > 0 && (
              <Card
                sx={{
                  bg: "white",
                  boxShadow: 0,
                  mt: 1,
                  position: "absolute",
                  py: 1,
                  top: "100%",
                  width: "100%",
                  zIndex: 1
                }}
              >
                {results.map(result => (
                  <Flex key={result._id}>
                    <Box sx={{ px: 3, py: 2 }}>
                      <Link
                        href={`/spaces/${props.match.params.spaceId}/${result.type}s/${result._id}`}
                      >
                        <b>{result.name}</b>
                      </Link>
                      <Text>{result.type}</Text>
                    </Box>
                  </Flex>
                ))}
              </Card>
            )}
          </Box>
        ) : (
          <Link onClick={() => setVisible(true)}>
            <Search />
          </Link>
        );
      }}
    </SpaceContext.Consumer>
  );
};

export default SpaceSearch;
