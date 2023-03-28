import { Select } from "@mantine/core";

type SelectPageSizeProps = {
  size: number;
  onChange: (size: number) => void;
};

const options = [
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

function SelectPageSize(props: SelectPageSizeProps) {
  return (
    <Select
      data={options}
      value={props.size.toString()}
      unselectable="on"
      label="Page Size"
      sx={{
        width: "100px",
      }}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onChange={(value) => props.onChange(parseInt(value!, 10))}
    />
  );
}

export default SelectPageSize;
