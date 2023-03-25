import { Alert, Stack, Table, Text } from "@mantine/core";
import { toTitleCase } from "../../../lib/strings";
import { TimeEntry } from "../../../types/time-entries";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type TimerHistoryTableProps = {
  group: "today" | "yesterday" | "this week";
  data: TimeEntry[];
};

function TimerHistoryTable(props: TimerHistoryTableProps) {
  if (props.data.length === 0) {
    return (
      <Stack spacing={"xl"}>
        <Text fw={"bold"}>{toTitleCase(props.group)}</Text>
        <Text>No time entries</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing={"xl"}>
      <Stack mt={"xl"} spacing="sm">
        <Text fw={"bold"}>{toTitleCase(props.group)}</Text>
        <Table striped withBorder withColumnBorders highlightOnHover>
          <TableHeader />
          <tbody>
            {props.data.map((timeEntry) => (
              <TableRow key={timeEntry.id} timeEntry={timeEntry} />
            ))}
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default TimerHistoryTable;
