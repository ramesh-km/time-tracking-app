import { Stack, Table, Text } from "@mantine/core";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type TimerHistoryTableProps = {};

function TimerHistoryTable(props: TimerHistoryTableProps) {
  return (
    <Stack spacing={"xl"}>
      <Stack mt={"xl"} spacing="sm">
        <Text fw={"bold"}>Today</Text>
        <Table>
          <TableHeader />
          <tbody>
            <TableRow />
            <TableRow />
            <TableRow />
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default TimerHistoryTable;
