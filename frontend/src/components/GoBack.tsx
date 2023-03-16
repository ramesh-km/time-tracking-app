import { ActionIcon } from "@mantine/core";
import { IconArrowLeft, IconChevronLeft } from "@tabler/icons-react";

type GoBackProps = {
  to?: string;
};

function GoBack(props: GoBackProps) {
  return (
    <ActionIcon>
      <IconChevronLeft />
    </ActionIcon>
  );
}

export default GoBack;
