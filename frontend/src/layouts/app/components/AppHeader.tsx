import {
  ActionIcon,
  Group,
  Header,
  Title,
  useMantineTheme,
} from "@mantine/core";
import GoBack from "../../../components/GoBack";

function AppHeader() {
  const theme = useMantineTheme();
  return (
    <Header withBorder={false} height="3rem">
      <Group spacing={4} p={"sm"} align={"center"} h={"100%"}>
        <GoBack />
        <Title order={3}>Timer</Title>
      </Group>
    </Header>
  );
}

export default AppHeader;
