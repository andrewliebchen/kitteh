/* eslint-disable react/jsx-pascal-case */

import { Text, Styled } from "theme-ui";
import dayjs from "dayjs";
import Weight from "./Weight";

const WeightsTable = props => (
  <table width="100%" cellSpacing="8" style={{ margin: "0 -8px 0 -8px" }}>
    <thead>
      <tr>
        <Styled.th>
          <Text>Weight</Text>
        </Styled.th>
        <Styled.th>
          <Text>Date</Text>
        </Styled.th>
        <Styled.th>
          <Text>Time</Text>
        </Styled.th>
      </tr>
    </thead>
    <tbody>
      {props.weights.map(weight => (
        <tr key={weight.id}>
          <Styled.td>
            <Weight value={weight.fields.Weight} />
          </Styled.td>
          <Styled.td>
            <Text>{dayjs(weight.fields.Recorded).format("ddd, MMM D")}</Text>
          </Styled.td>
          <Styled.td>
            <Text>{dayjs(weight.fields.Recorded).format("h:mma")}</Text>
          </Styled.td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default WeightsTable;
