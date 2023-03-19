import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createTag } from "../../../lib/api/tags";
import { mutationKeys, queryKeys } from "../../../lib/react-query-keys";
import { createTagSchema } from "../../../lib/zod-schemas";
import { CreateTagInput, TagWithCount } from "../../../types/tags";
import { modals } from "@mantine/modals";

function CreateTag() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTagInput>({
    resolver: zodResolver(createTagSchema),
  });

  const closeModal = () => modals.closeAll();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [mutationKeys.createTag],
    mutationFn: createTag,
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: "Tag created successfully",
        color: "teal",
      });

      // Update the tags with count query
      queryClient.setQueryData(
        [queryKeys.allTagsWithCount],
        (tags: TagWithCount[] | undefined) => {
          return Array.isArray(tags)
            ? [...tags, { name: data.name, count: 0 }]
            : [];
        }
      );

      // Close the modal
      closeModal();
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data.name);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Group position="right">
          <Button type="submit"
          loading={mutation.isLoading}
          >Create</Button>
          <Button variant="outline" onClick={closeModal} type="button">
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default CreateTag;
