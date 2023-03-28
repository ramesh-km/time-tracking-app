import { Container, Divider, Stack, Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { init } from "echarts";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { getInsightsData } from "../../lib/api/time-entries";
import queryClient from "../../lib/query-client";
import { queryKeys } from "../../lib/react-query-keys";

export async function loader() {
  const data = await Promise.all([
    queryClient.ensureQueryData({
      queryKey: [queryKeys.getInsightsData, { type: "bar-chart" }],
      queryFn: () => getInsightsData("bar-chart"),
    }),
    queryClient.ensureQueryData({
      queryKey: [queryKeys.getInsightsData, { type: "calendar-heatmap" }],
      queryFn: () =>
        getInsightsData("calendar-heatmap", {
          year: new Date().getFullYear(),
        }),
    }),
  ]);

  return data;
}

export function Component() {
  const [barChartData, calendarHeatmapData] = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  const barChartRef = React.useRef<HTMLDivElement>(null);
  const heatmapChartRef = React.useRef<HTMLDivElement>(null);
  useDocumentTitle("Insights");
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
        data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: barChartData,
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
        text: `Calendar Heatmap of Time Entries for ${new Date().getFullYear()}`,
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 24,
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
        range: "2023",
        itemStyle: {
          borderWidth: 0.5,
        },
        yearLabel: { show: false },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: calendarHeatmapData,
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
          Calendar heatmap of time entries. The color of the cell represents the
          number of time entries for that day.
        </Text>
      </Stack>
      <Divider />
      <Stack w={"100%"} align={"center"}>
        <Container h={300} w={"100%"} ref={barChartRef} />
        <Text>Last week time entries</Text>
      </Stack>
    </Stack>
  );
}
