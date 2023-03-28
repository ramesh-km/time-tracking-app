import { Badge, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import dayjs from "dayjs";
import { openUpdateTimeEntryModal } from "../../../components/modals/UpdateTimeEntry";
import { formatDuration, getDuration } from "../../../lib/dates";
import { ReportsDataRow } from "../../../types/time-entries";

type ReportsTableRowProps = {
  timeEntry: ReportsDataRow;
};

function ReportsTableRow(props: ReportsTableRowProps) {
  return (
    <tr>
      <td>{props.timeEntry.note}</td>
      <td>{dayjs(props.timeEntry.start).format("MMM D, YYYY")}</td>
      <td>{dayjs(props.timeEntry.start).format("h:mm A")}</td>
      <td>
        {props.timeEntry.end
          ? dayjs(props.timeEntry.end).format("h:mm A")
          : "In Progress"}
      </td>
      <td>
        {props.timeEntry.end
          ? formatDuration(
              getDuration(props.timeEntry.start, props.timeEntry.end)
            )
          : "In Progress"}
      </td>
      <th>
        {props.timeEntry.tags.map((tag) => (
          <Badge key={tag.name} color={tag.name}>
            {tag.name}
          </Badge>
        ))}
      </th>
      <th>
        <ActionIcon
          onClick={() => openUpdateTimeEntryModal(props.timeEntry.id)}
        >
          <IconEdit />
        </ActionIcon>
      </th>
    </tr>
  );
}

export default ReportsTableRow;
