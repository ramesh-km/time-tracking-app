import { Group, Header, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";
import GoBack from "../../../components/GoBack";
import { toTitleCase } from "../../../lib/strings";

function AppHeader() {
  const location = useLocation();
  console.log("🚀 ~ file: AppHeader.tsx:8 ~ AppHeader ~ location:", location)
  return (
    <Header withBorder={false} height="3rem">
      <Group spacing={4} p={"sm"} align={"center"} h={"100%"}>
        {location.pathname === "/" ? null : <GoBack />}
        <Title order={3}>
          {location.pathname === "/"
            ? "Timer"
            : toTitleCase(location.pathname.replace("/", ""))}
        </Title>
      </Group>
    </Header>
  );
}

export default AppHeader;
