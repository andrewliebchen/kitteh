import { Flex, Input, Link, Box, Text, Card } from "theme-ui";
import { Search, X } from "react-feather";
import React, { useState } from "react";
import SpaceContext from "./SpaceContext";

const SpaceSearch = () => {
  const [visible, setVisible] = useState(true);
  const [results, setResults] = useState([]);

  return (
    <SpaceContext.Consumer>
      {props => {
        const elements = props.animals.concat(props.fosters);

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
                  p: 3,
                  position: "absolute",
                  top: "100%",
                  boxShadow: 0,
                  width: "100%",
                  mt: 1
                }}
              >
                {results.map(result => (
                  <Flex key={result._id}>{result.name}</Flex>
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
