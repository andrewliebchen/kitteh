import { Box } from "theme-ui";
import { TimeSeries, Index } from "pondjs";
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  BarChart,
  LineChart,
  styler
} from "react-timeseries-charts";
import theme from "./theme";

const WeightsChart = props => {
  const series = new TimeSeries({
    name: "weights",
    columns: ["index", "weight"],
    points: props.weights.map(weight => {
      console.log(new Date(weight.fields.Recorded));
      return [
        Index.getIndexString("1d", new Date(weight.fields.Recorded)),
        weight.fields.Weight
      ];
    })
  });

  console.log(series);

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
                max={20}
                width="70"
                type="linear"
                showGrid
                hideAxisLine
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
