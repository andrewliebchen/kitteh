import { Box } from "theme-ui";
import { TimeSeries, Index } from "pondjs";
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler
} from "react-timeseries-charts";
import theme from "./theme";

const WeightsChart = props => {
  const series = new TimeSeries({
    name: "weights",
    columns: ["index", "weight"],
    points: props.weights.map(weight => [
      Index.getIndexString("1d", new Date(weight.fields.Recorded)),
      weight.fields.Weight
    ])
  });

  return (
    props.weights.length > 0 && (
      <Box mb={3}>
        <Resizable>
          <ChartContainer timeRange={series.range()}>
            <ChartRow height="200">
              <YAxis
                id="weight"
                label="Weight"
                min={0}
                max={1000}
                type="linear"
                visible={false}
              />
              <Charts>
                <LineChart
                  axis="weight"
                  columns={["weight"]}
                  series={series}
                  style={styler([
                    { key: "weight", color: theme.colors.primary, width: 5 }
                  ])}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </Box>
    )
  );
};

export default WeightsChart;
