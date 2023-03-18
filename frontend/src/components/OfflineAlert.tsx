import { Alert } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import { IconPlugConnectedX } from "@tabler/icons-react";

function OfflineAlert() {
  const { online } = useNetwork();

  if (online) {
    return null;
  }

  return (
    <Alert color="red" icon={<IconPlugConnectedX />}>
      You are offline. Some features may not work.
    </Alert>
  );
}

export default OfflineAlert;
