import { Flex, Input, Link, Box } from "theme-ui";
import { Search, X } from "react-feather";
import React, { useState } from "react";

const SpaceSearch = props => {
  const [visible, setVisible] = useState(false);

  return (
    <Box>
      {visible ? (
        <Flex sx={{ alignItems: "center", width: 400 }}>
          <Input type="search" placeholder="Search..." sx={{ width: 600 }} />
          <Link onClick={() => setVisible(false)} sx={{ ml: 2 }}>
            <X />
          </Link>
        </Flex>
      ) : (
        <Link onClick={() => setVisible(true)}>
          <Search />
        </Link>
      )}
    </Box>
  );
};

export default SpaceSearch;
