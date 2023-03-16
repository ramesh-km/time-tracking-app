import { ActionIcon, Button, Group, Stack, Table } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export function Component() {
  return (
    <Stack
    spacing={"xl"}
    >
      {/* Tags table */}
      <Group>
        <Button rightIcon={<IconPlus />}>Create Tag</Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tag 1</td>
            <td>10</td>
            <td>
              <Group>
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
  );
}
