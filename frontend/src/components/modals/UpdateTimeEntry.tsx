import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Group,
  Loader,
  MultiSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import useGetTimeEntry from "../../hooks/useGetTimeEntry";
import useUpdateTimeEntry from "../../hooks/useUpdateTimeEntry";
import { getAllTags } from "../../lib/api/tags";
import { queryKeys } from "../../lib/react-query-keys";
import { updateTimeEntrySchema } from "../../lib/zod-schemas";
import { UpdateTimeEntryInput } from "../../types/time-entries";

type UpdateTimeEntryProps = {
  id: number;
};

function UpdateTimeEntry(props: UpdateTimeEntryProps) {
  const timeEntryQuery = useGetTimeEntry(props.id);
  const tagsQuery = useQuery({
    queryKey: [queryKeys.allTags],
    queryFn: getAllTags,
  });
  const tagsData =
    tagsQuery.data?.map((tag) => ({
      label: tag.name,
      value: tag.name,
    })) || [];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTimeEntryInput>({
    resolver: zodResolver(updateTimeEntrySchema),
    defaultValues: {
      note: timeEntryQuery.data?.note,
      start: dayjs(timeEntryQuery.data?.start).toDate(),
      end: timeEntryQuery.data?.end
        ? dayjs(timeEntryQuery.data?.end).toDate()
        : undefined,
      tags: timeEntryQuery.data?.tags.map((i) => i.name) || [],
    },
  });

  const mutation = useUpdateTimeEntry();

  const onSubmit = (data: UpdateTimeEntryInput) => {
    mutation.mutate(
      { id: props.id, ...data },
      {
        onSuccess: () => {
          modals.closeAll();
        },
      }
    );
  };

  if (timeEntryQuery.isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"lg"}>
        <TextInput
          {...register("note")}
          label="Note"
          error={errors.note?.message}
        />
        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              popoverProps={{ withinPortal: true }}
              label="Start Time"
              error={errors.start?.message}
            />
          )}
        />
        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              popoverProps={{ withinPortal: true }}
              label="End Time"
              error={errors.end?.message}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              label="Tags"
              error={errors.tags?.message}
              data={tagsData}
            />
          )}
        />
        <Group mt={"lg"}>
          <Button
            variant={"outline"}
            type="button"
            onClick={() => modals.closeAll()}
          >
            Cancel
          </Button>
          <Button type="submit" loading={mutation.isLoading}>
            Update
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export function openUpdateTimeEntryModal(id: number) {
  modals.open({
    title: "Update Time Entry",
    children: <UpdateTimeEntry id={id} />,
    size: "xl",
    padding: "xl",
  });
}
export default UpdateTimeEntry;
