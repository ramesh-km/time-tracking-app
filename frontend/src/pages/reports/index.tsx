import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Stack,
  Table,
} from "@mantine/core";
import { DateInput, DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { useDocumentTitle } from "@mantine/hooks";
import { IconEdit, IconFileExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { getTimeEntriesReport } from "../../lib/api/time-entries";
import queryClient from "../../lib/query-client";
import { queryKeys } from "../../lib/react-query-keys";

const defaultDates: DatesRangeValue = [
  dayjs().toDate(),
  dayjs().add(1, "day").toDate(),
];

export async function loader() {
  const reportsQuery = {
    queryKey: [
      queryKeys.getTimeEntriesReport,
      {
        from: dayjs().startOf("week").toDate(),
        to: dayjs().toDate(),
        page: 0,
        size: 10,
      },
    ],
    queryFn: getTimeEntriesReport,
  };

  return await queryClient.ensureQueryData(reportsQuery);
}

export function Component() {
  useDocumentTitle("Reports");
  const [value, setValue] = useState<DatesRangeValue>(defaultDates);
  const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Stack spacing="xl">
      <Group>
        <DatePickerInput type="range" value={value} onChange={setValue} />
        <Button leftIcon={<IconFileExport />}>Export</Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Tags</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Task 1</td>
            <td>15th May 2021</td>
            <td>10:00 AM</td>
            <td>10:30 AM</td>
            <td>30 minutes</td>
            <th>
              <Badge color="blue">Tag 1</Badge>
              <Badge color="blue">Tag 2</Badge>
            </th>
            <th>
              <ActionIcon>
                <IconEdit />
              </ActionIcon>
            </th>
          </tr>
        </tbody>
      </Table>
    </Stack>
  );
}
