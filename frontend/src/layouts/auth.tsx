import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Container size={"xs"}>
      <Stack my={"10vh"} spacing={"xs"}>
        <Title order={1} variant={"gradient"}>
          Time Tracker
        </Title>
        <Text size="xs" color={"dimmed"}>
          Time tracking simplified. Track your time and get insights into your
          work.
        </Text>
      </Stack>
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
}

export default AuthLayout;
