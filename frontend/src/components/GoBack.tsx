import { ActionIcon } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type GoBackProps = {
  to?: string;
};

function GoBack(props: GoBackProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (props.to) {
      navigate(props.to);
    } else {
      navigate(-1);
    }
  };
  return (
    <ActionIcon onClick={handleClick}>
      <IconChevronLeft />
    </ActionIcon>
  );
}

export default GoBack;
