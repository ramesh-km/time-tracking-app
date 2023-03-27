import { Button, Grid, Stack, TextInput } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconNote, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useDeleteTimeEntry from "../../hooks/useDeleteTimeEntry";
import { getAllTags } from "../../lib/api/tags";
import {
  createTimeEntry,
  getAllCurrentWeekEntries,
} from "../../lib/api/time-entries";
import queryClient from "../../lib/query-client";
import { mutationKeys, queryKeys } from "../../lib/react-query-keys";
import TagsSelection from "./components/TagsSelection";
import TimerHistoryTable from "./components/TimerHIstoryTable";

export async function loader() {
  const tagsQuery = {
    queryKey: [queryKeys.allTags],
    queryFn: getAllTags,
  } as const;

  const timeEntriesQuery = {
    queryKey: [queryKeys.allCurrentWeekEntries],
    queryFn: getAllCurrentWeekEntries,
  };

  return await Promise.all([
    queryClient.ensureQueryData(tagsQuery),
    queryClient.ensureQueryData(timeEntriesQuery),
  ]);
}

export function Component() {
  useDocumentTitle("Timer");

  const [tagsInitialData, timeEntriesInitialData] = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const tagsQuery = useQuery({
    queryKey: [queryKeys.allTags],
    queryFn: getAllTags,
    initialData: tagsInitialData,
  });
  const timeEntriesQuery = useQuery({
    queryKey: [queryKeys.allCurrentWeekEntries],
    queryFn: getAllCurrentWeekEntries,
    initialData: timeEntriesInitialData,
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
      // notifications.show({
      //   title: "Timer started",
      //   message: "Time entry has been created",
      //   color: "teal",
      // });

      queryClient.invalidateQueries([queryKeys.allCurrentWeekEntries]);
      setNote("");
      setTags([]);
    },
  });

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleTimerStart = () => {
    mutation.mutate({
      note,
      tags
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
          <Button
            onClick={handleTimerStart}
            loading={mutation.isLoading}
            loaderPosition="center"
            disabled={note.length === 0}
          >
            {isTimerOn ? <IconPlayerPlay /> : <IconPlayerPause />}
          </Button>
        </Grid.Col>
      </Grid>

      <TimerHistoryTable
        group="today"
        data={timeEntriesQuery.data.filter((t) =>
          dayjs(t.start).isSame(dayjs(), "day")
        )}
      />
      <TimerHistoryTable
        group="yesterday"
        data={timeEntriesQuery.data.filter((t) =>
          dayjs(t.start).isSame(dayjs().subtract(1, "day"), "day")
        )}
      />
      <TimerHistoryTable
        group="this week"
        data={timeEntriesQuery.data.filter((t) =>
          dayjs(t.start).isBetween(
            dayjs().startOf("week"),
            dayjs().subtract(1, "day"),
            "day",
            "[)"
          )
        )}
      />
    </Stack>
  );
}
