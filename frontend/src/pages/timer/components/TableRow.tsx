import { Badge, Group, ActionIcon, Loader, Code, Kbd } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlayerPause, IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useDeleteTimeEntry from "../../../hooks/useDeleteTimeEntry";
import useStopTimeEntry from "../../../hooks/useStopTimeEntry";
import { formatDuration, getDuration } from "../../../lib/dates";
import queryClient from "../../../lib/query-client";
import { queryKeys } from "../../../lib/react-query-keys";
import { TimeEntry } from "../../../types/time-entries";

type TableRowProps = {
  timeEntry: TimeEntry;
};

function TableRow(props: TableRowProps) {
  const { timeEntry } = props;
  const [duration, setDuration] = useState(
    getDuration(timeEntry.start, timeEntry.end || new Date())
  );

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
      },
    });
  };

  const stopMutation = useStopTimeEntry();
  const handleStop = () => {
    stopMutation.mutate(timeEntry.id, {
      onSuccess: () => {
        notifications.show({
          title: "Timer stopped",
          message: "Time entry has been stopped",
          color: "teal",
          id: "timer-stopped",
        });
      },
    });
  };

  useEffect(() => {
    if (timeEntry.end) {
      return;
    }

    const newDuration = getDuration(timeEntry.start, new Date());
    const timeout = setTimeout(() => {
      setDuration(newDuration);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeEntry.end, duration]);

  return (
    <tr>
      <td>{timeEntry.note}</td>
      <td>{dayjs(timeEntry.start).format("HH:mm")}</td>
      <td>{timeEntry.end ? dayjs(timeEntry.end).format("HH:mm") : "-"}</td>
      <td>
        {timeEntry.end ? (
          formatDuration(duration)
        ) : (
          <Kbd>{formatDuration(duration)}</Kbd>
        )}
      </td>
      <td>
        <Group>
          <ActionIcon>
            <IconEdit />
          </ActionIcon>
          <ActionIcon onClick={handleDelete}>
            <IconTrash />
          </ActionIcon>
          {timeEntry.end ? null : (
            <ActionIcon onClick={handleStop}>
              <IconPlayerPause />
            </ActionIcon>
          )}
        </Group>
      </td>
    </tr>
  );
}

export default TableRow;
