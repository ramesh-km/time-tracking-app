import { Group, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import useDeleteTag from "../../../hooks/useDeleteTag";
import { TagWithCount } from "../../../types/tags";

type TagActionsProps = {
  tag: TagWithCount;
};

function TagActions(props: TagActionsProps) {
  const mutation = useDeleteTag();

  const handleDelete = () => {
    mutation.mutate(props.tag.name);
  };

  return (
    <Group>
      <ActionIcon onClick={handleDelete} loading={mutation.isLoading}>
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}

export default TagActions;
