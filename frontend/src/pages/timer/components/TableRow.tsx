import { Badge, Group, ActionIcon } from "@mantine/core";
import { IconPlayerPause, IconEdit, IconTrash } from "@tabler/icons-react";

type TableRowProps = {};

function TableRow(props: TableRowProps) {
  return (
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
  );
}

export default TableRow;
