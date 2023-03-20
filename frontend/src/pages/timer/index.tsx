import { Button, Grid, MultiSelect, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconNote, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { createTag, getAllTags } from "../../lib/api/tags";
import { createTimeEntry } from "../../lib/api/time-entries";
import queryClient from "../../lib/query-client";
import { mutationKeys, queryKeys } from "../../lib/react-query-keys";
import TagsSelection from "./components/TagsSelection";
import TimerHistoryTable from "./components/TimerHIstoryTable";

export async function loader() {
  const tagsQuery = {
    queryKey: [queryKeys.allTags],
    queryFn: getAllTags,
  } as const;

  return await queryClient.ensureQueryData(tagsQuery);
}

export function Component() {
  const tagsInitialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const tagsQuery = useQuery({
    queryKey: [queryKeys.allTags],
    queryFn: getAllTags,
    initialData: tagsInitialData,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState<string>("");

  const tagsData = tagsQuery.data.map((tag) => ({
    label: tag.name,
    value: tag.name,
  }));

  const handleTagsChange = (value: string[]) => {
    setTags(value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [mutationKeys.createTimeEntry],
    mutationFn: createTimeEntry,
    onSuccess: () => {
      notifications.show({
        title: "Timer started",
        message: "Time entry has been created",
        color: "teal",
      });
    },
  });

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleTimerStart = () => {
    mutation.mutate({
      note,
      tags,
    });
  };

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
            onChange={handleNoteChange}
            value={note}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <TagsSelection
            data={tagsData}
            onChange={handleTagsChange}
            value={tags}
          />
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Button onClick={handleTimerStart} loading={mutation.isLoading}>
            {isTimerOn ? <IconPlayerPlay /> : <IconPlayerPause />}
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
