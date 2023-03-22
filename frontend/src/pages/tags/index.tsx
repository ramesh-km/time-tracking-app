import { Button, Group, Stack, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import queryClient from "../../lib/query-client";
import { getAllTagsWithCount } from "../../lib/api/tags";
import { queryKeys } from "../../lib/react-query-keys";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TagsTableHeader from "./components/TagsTableHeader";
import { modals } from "@mantine/modals";
import CreateTag from "./components/CreateTag";
import TagsTableRow from "./components/TagsTableRow";
import { useDocumentTitle } from "@mantine/hooks";

const tagsQuery = {
  queryKey: [queryKeys.allTagsWithCount],
  queryFn: getAllTagsWithCount,
};

export async function loader() {
  const tags = await queryClient.ensureQueryData(tagsQuery);

  return tags;
}

export function Component() {
  useDocumentTitle("Tags");

  const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data: tags } = useQuery({
    ...tagsQuery,
    initialData,
  });

  const handleCreateTag = () => {
    modals.open({
      title: "Create Tag",
      children: <CreateTag />,
    });
  };

  return (
    <Stack spacing={"xl"}>
      <Group>
        <Button onClick={handleCreateTag} rightIcon={<IconPlus />}>
          Create Tag
        </Button>
      </Group>
      <Table>
        <TagsTableHeader />
        <tbody>
          {tags.map((tag) => (
            <TagsTableRow key={tag.name} tag={tag} />
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}
