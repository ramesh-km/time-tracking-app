import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  MultiSelect,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconDownload,
  IconEdit,
  IconNote,
  IconPlayerPause,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";

const data = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];

export function Component() {
  const isTimerOn = true;
  return (
    <Stack>
      <Grid columns={12}>
        <Grid.Col span={"auto"}>
          <TextInput
            placeholder="Enter a task name"
            w={"100%"}
            icon={<IconNote />}
            autoFocus
            variant={"default"}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <MultiSelect
            data={data}
            // label="Your favorite frameworks/libraries"
            placeholder="Tags"
            width={300}
            searchable
            clearable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            // onCreate={(query) => {}}
          />
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Button>
            {isTimerOn ? <IconPlayerPause /> : <IconPlayerPlay />}
          </Button>
        </Grid.Col>
      </Grid>

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td>10:00 AM</td>
                <td>10:30 AM</td>
                <td>
                  <Badge>00:30:00</Badge>
                </td>
                <td>
                  <Group>
                    <ActionIcon>
                      <IconPlayerPause />
                    </ActionIcon>
                    <ActionIcon>
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon>
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </td>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td>10:00 AM</td>
                <td>10:30 AM</td>
                <td>30 minutes</td>
                <td>
                  <Group>
                    <ActionIcon>
                      <IconPlayerPause />
                    </ActionIcon>
                    <ActionIcon>
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon>
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            </tbody>
          </Table>
        </Stack>

        <Stack mt={"xl"} spacing="sm">
          <Text fw={"bold"}>Day before yesterday</Text>
          <Table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td>10:00 AM</td>
                <td>10:30 AM</td>
                <td>30 minutes</td>
                <td>
                  <Group>
                    <ActionIcon>
                      <IconPlayerPause />
                    </ActionIcon>
                    <ActionIcon>
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon>
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            </tbody>
          </Table>
        </Stack>
      </Stack>
    </Stack>
  );
}
