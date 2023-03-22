import { Stack, Table, Text } from "@mantine/core";
import { toTitleCase } from "../../../lib/strings";
import { TimeEntry } from "../../../types/time-entries";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type TimerHistoryTableProps = {
  group: 'today' | 'yesterday' | 'this week',
  data: TimeEntry[]
};

function TimerHistoryTable(props: TimerHistoryTableProps) {
  return (
    <Stack spacing={"xl"}>
      <Stack mt={"xl"} spacing="sm">
        <Text fw={"bold"}>
          {toTitleCase(
            props.group
          )}
        </Text>
        <Table>
          <TableHeader />
          <tbody>
            {
              props.data.map((timeEntry) => (
                <TableRow key={timeEntry.id} timeEntry={timeEntry} />
              ))
            }
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default TimerHistoryTable;
