import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Bar from "./Bar";
import { Flex, Text } from "theme-ui";

const BarRow = props => (
  <Flex sx={{ alignItems: "center" }}>
    <Text sx={{ width: 200, fontWeight: "bold" }}>
      {dayjs(props.createdAt).format("ddd, MMMM DD, h:mm A ")}
    </Text>
    {props.name && <Text sx={{ width: 60 }}>{props.name}</Text>}
    <Text sx={{ width: 60, textAlign: "right", mr: 2 }}>{props.value}</Text>
    <Bar value={props.value} />
  </Flex>
);

BarRow.propTypes = {
  _id: PropTypes.string,
  createdAt: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string
};

export default BarRow;
