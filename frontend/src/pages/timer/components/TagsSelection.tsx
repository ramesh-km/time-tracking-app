import { MultiSelect, SelectItem } from "@mantine/core";

type TagsSelectionProps = {
  data: SelectItem[];
  value: string[];
  onChange: (value: string[]) => void;
};

function TagsSelection(props: TagsSelectionProps) {
  return (
    <MultiSelect
      data={props.data}
      placeholder="Tags"
      width={300}
      value={props.value}
      onChange={props.onChange}
      searchable
      clearable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      // onCreate={(query) => {}}
    />
  );
}

export default TagsSelection;
