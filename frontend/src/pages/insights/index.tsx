import { Box, Container, Divider, Stack, Text } from "@mantine/core";
import React from "react";
import { init, number, time } from "echarts";

const getVirtualData = () => {
  const date = number.parseDate("2016-01-01");
  const end = number.parseDate("2017-01-01");
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let t = date; t < end; t += dayTime) {
    data.push([
      time.format(t, "yyyy-MM-dd", true),
      Math.floor(Math.random() * 10000),
    ]);
  }
  return data;
};

export function Component() {
  const barChartRef = React.useRef<HTMLDivElement>(null);
  const heatmapChartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!barChartRef.current || !heatmapChartRef.current) {
      return;
    }
    const barChart = init(barChartRef.current);
    barChart.setOption({
      title: {
        text: "Bar Chart",
        left: "center",
        top: 30,
      },
      xAxis: {
        type: "category",
        data: new Array(14).fill(0).map((_, i) => `Day ${i + 1}`),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [
            820, 932, 901, 934, 1290, 1330, 1320, 1200, 1100, 900, 800, 700,
            600, 500,
          ],
          type: "bar",
        },
      ],
      tooltip: {},
    });

    const heatmapChart = init(heatmapChartRef.current);
    heatmapChart.setOption({
      title: {
        top: 30,
        left: "center",
        text: "Daily Step Count",
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10000,
        type: "piecewise",
        orient: "horizontal",
        left: "center",
        top: 65,
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ["auto", 13],
        range: "2016",
        itemStyle: {
          borderWidth: 0.5,
        },
        yearLabel: { show: false },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: getVirtualData(),
      },
    });

    return () => {
      barChart.dispose();
    };
  }, []);

  return (
    <Stack align={"center"} spacing={"xl"}>
      <Stack w={"100%"} align={"center"} spacing={10}>
        <Container h={300} w={"100%"} ref={heatmapChartRef} />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </Stack>
      <Divider />
      <Stack w={"100%"} align={"center"}>
        <Container h={300} w={"100%"} ref={barChartRef} />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </Stack>
    </Stack>
  );
}
