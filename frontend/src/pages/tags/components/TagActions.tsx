import { Group, ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../../../lib/api/tags";
import { mutationKeys, queryKeys } from "../../../lib/react-query-keys";
import { TagWithCount } from "../../../types/tags";

type TagActionsProps = {
  tag: TagWithCount;
};

function TagActions(props: TagActionsProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [mutationKeys.deleteTag],
    mutationFn: deleteTag,
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Tag deleted successfully",
        color: "teal",
        id: "delete-tag",
      });

      // Update the tags with count query
      queryClient.setQueryData(
        [queryKeys.allTagsWithCount],
        (tags: TagWithCount[] | undefined) => {
          return Array.isArray(tags)
            ? tags.filter((tag) => tag.name !== props.tag.name)
            : [];
        }
      );
    },
  });

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
