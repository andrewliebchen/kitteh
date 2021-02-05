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
import dayjs from "dayjs";

const growthModel = [
  { min: 50, max: 150 },
  { min: 150, max: 250 },
  { min: 250, max: 350 },
  { min: 350, max: 450 },
  { min: 450, max: 550 },
  { min: 550, max: 850 }
];

const WeightsChart = props => {
  // TODO: Start growth model from birthday
  // TODO: simplify...
  const growthModelSeriesMax = new TimeSeries({
    name: "growthModelMax",
    columns: ["index", "weight"],
    points: growthModel.map((record, index) => [
      Index.getIndexString(
        "1d",
        new Date(
          dayjs()
            .subtract(growthModel.length - index, "week")
            .toString()
        )
      ),
      record.max
    ])
  });

  const growthModelSeriesMin = new TimeSeries({
    name: "growthModelMax",
    columns: ["index", "weight"],
    points: growthModel.map((record, index) => [
      Index.getIndexString(
        "1d",
        new Date(
          dayjs()
            .subtract(growthModel.length - index, "week")
            .toString()
        )
      ),
      record.min
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
                  series={growthModelSeriesMax}
                />
                <LineChart
                  axis="weight"
                  columns={["weight"]}
                  series={growthModelSeriesMin}
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
