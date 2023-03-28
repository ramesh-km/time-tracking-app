import { Button, Group, Pagination, Stack, Table } from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { useDocumentTitle } from "@mantine/hooks";
import { IconFileExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getTimeEntriesReport } from "../../lib/api/time-entries";
import queryClient from "../../lib/query-client";
import { queryKeys } from "../../lib/react-query-keys";
import ReportsTableHeader from "./components/ReportsTableHeader";
import ReportsTableRow from "./components/ReportsTableRow";
import SelectPageSize from "./components/SelectPageSize";

const defaultDates: DatesRangeValue = [
  dayjs().toDate(),
  dayjs().add(1, "day").toDate(),
];

export async function loader() {
  const reportsQuery = {
    queryKey: [
      queryKeys.getTimeEntriesReport,
      {
        page: 0,
        size: 10,
      },
    ],
    queryFn: () => getTimeEntriesReport({ page: 0, size: 10 }),
  };

  const data = await queryClient.ensureQueryData(reportsQuery);
  return data;
}

export function Component() {
  useDocumentTitle("Reports");
  const [dates, setDates] = useState<DatesRangeValue>(defaultDates);
  const [page, setPage] = useState(0);
  const activePage = page + 1;
  const [size, setSize] = useState(10);

  const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const query = useQuery({
    queryKey: [
      queryKeys.getTimeEntriesReport,
      {
        page,
        size,
      },
    ],
    queryFn: () => getTimeEntriesReport({ page, size }),
    initialData,
  });
  const totalPages = Math.ceil(query.data.total / size);

  const handleExport = () => {
    getTimeEntriesReport(
      {
        page,
        size,
        start: dayjs(dates[0]).format("YYYY-MM-DD"),
        end: dayjs(dates[1]).format("YYYY-MM-DD"),
      },
      true
    );
  };

  return (
    <Stack spacing="xl">
      <Group align={"flex-end"}>
        <DatePickerInput
          label="Report For Date Range"
          type="range"
          value={dates}
          onChange={setDates}
        />
        <Button onClick={handleExport} leftIcon={<IconFileExport />}>
          Export
        </Button>
      </Group>
      <Table>
        <ReportsTableHeader />
        <tbody>
          {query.data.data.map((timeEntry) => (
            <ReportsTableRow key={timeEntry.id} timeEntry={timeEntry} />
          ))}
        </tbody>
      </Table>
      <Group position="apart" align={"flex-end"}>
        <SelectPageSize size={size} onChange={setSize} />
        <Pagination value={activePage} onChange={setPage} total={totalPages} />
      </Group>
    </Stack>
  );
}
