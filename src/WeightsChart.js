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
import { useGrowthModel } from "./hooks";
import dayjs from "dayjs";

const WeightsChart = props => {
  const growthModel = useGrowthModel();

  const growthModelSeries = new TimeSeries({
    name: "growthModel",
    columns: ["index", "weight"],
    points: growthModel.map(record => [
      Index.getIndexString(
        "1d",
        new Date(
          dayjs()
            .subtract(record.fields.Week, "week")
            .toString()
        )
      ),
      record.fields.Max
    ])
  });

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
                  series={growthModelSeries}
                />
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
