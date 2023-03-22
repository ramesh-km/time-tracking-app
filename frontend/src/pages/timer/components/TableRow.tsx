import { Badge, Group, ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlayerPause, IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import useDeleteTimeEntry from "../../../hooks/useDeleteTimeEntry";
import { getDuration } from "../../../lib/dates";
import queryClient from "../../../lib/query-client";
import { queryKeys } from "../../../lib/react-query-keys";
import { TimeEntry } from "../../../types/time-entries";

type TableRowProps = {
  timeEntry: TimeEntry;
};

function TableRow(props: TableRowProps) {
  const { timeEntry } = props;
  
  const deleteMutation = useDeleteTimeEntry();
  const handleDelete = () => {
    deleteMutation.mutate(timeEntry.id, {
      onSuccess: () => {
        notifications.show({
          title: "Timer deleted",
          message: "Time entry has been deleted",
          color: "red",
          id: "timer-deleted",
        });
        queryClient.invalidateQueries([queryKeys.allCurrentWeekEntries]);
      },
    });
  };

  return (
    <tr>
      <td>{timeEntry.note}</td>
      <td>{dayjs(timeEntry.start).format("HH:mm")}</td>
      <td>{dayjs(timeEntry.end).format("HH:mm")}</td>
      <td>
        <Badge>{getDuration(timeEntry.start, timeEntry.end)}</Badge>
      </td>
      <td>
        <Group>
          <ActionIcon>
            <IconPlayerPause />
          </ActionIcon>
          <ActionIcon>
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            onClick={handleDelete}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
}

export default TableRow;
