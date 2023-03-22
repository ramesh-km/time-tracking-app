import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTag } from "../lib/api/tags";
import { mutationKeys, queryKeys } from "../lib/react-query-keys";
import { TagWithCount } from "../types/tags";

function useDeleteTag() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [mutationKeys.deleteTag],
    mutationFn: deleteTag,
    onSuccess: (data, deletedTag) => {
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
            ? tags.filter((tag) => tag.name !== deletedTag)
            : [];
        }
      );
    },
  });

  return mutation;
}

export default useDeleteTag;
