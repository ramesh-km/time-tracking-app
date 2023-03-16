import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconNote, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

export function Component() {
  const isTimerOn = true;
  return (
    <Stack>
      <Flex align={"center"} gap={"xl"}>
        <TextInput
          placeholder="Enter a task name"
          w={"100%"}
          icon={<IconNote />}
          autoFocus
          variant={"default"}
        />
        <Button>{isTimerOn ? <IconPlayerPause /> : <IconPlayerPlay />}</Button>

        <Badge size={"xl"} w="10rem">
          00:00:00
        </Badge>
      </Flex>

      <Stack spacing={"xl"}>
        <Stack mt={"xl"} spacing="sm">
          <Text fw={"bold"}>Today</Text>
          <Table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td>10:00 AM</td>
                <td>10:30 AM</td>
                <td>30 minutes</td>
              </tr>
            </tbody>
          </Table>
        </Stack>

        <Stack mt={"xl"} spacing="sm">
          <Text fw={"bold"}>Yesterday</Text>
          <Table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td>10:00 AM</td>
                <td>10:30 AM</td>
                <td>30 minutes</td>
              </tr>
            </tbody>
          </Table>
        </Stack>

        <Stack mt={"xl"} spacing="sm">
          <Text fw={"bold"}>15th May 2021</Text>
          <Table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td>10:00 AM</td>
                <td>10:30 AM</td>
                <td>30 minutes</td>
              </tr>
            </tbody>
          </Table>
        </Stack>

        <Center>
          <Button variant="outline">Load More</Button>
        </Center>
      </Stack>
    </Stack>
  );
}
