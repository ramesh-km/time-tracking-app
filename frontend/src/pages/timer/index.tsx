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
import { getTags } from "../../lib/api/tags";
import queryClient from "../../lib/query-client";
import queryKeys from "../../lib/query-keys";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import TimerHistoryTable from "./components/TimerHIstoryTable";

const data = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];

export async function loader() {
  const tagsQuery = {
    queryKey: [queryKeys.tags],
    queryFn: getTags,
  } as const;

  return await queryClient.ensureQueryData(tagsQuery);
}

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

      <TimerHistoryTable />
      <TimerHistoryTable />
      <TimerHistoryTable />
      <TimerHistoryTable />
    </Stack>
  );
}
