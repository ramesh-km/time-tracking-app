import { notifications } from "@mantine/notifications";
import { IconExclamationMark } from "@tabler/icons-react";
import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { apiErrorSchema } from "./zod-schemas";

const handleError = (err: unknown) => {
  console.error(err);
  const error = isAxiosError(err) ? err.response?.data : err;
  const parsedError = apiErrorSchema.safeParse(error);

  if (!parsedError.success) {
    notifications.show({
      title: "Internal server error",
      message: "An unexpected error occurred",
      icon: <IconExclamationMark />,
      color: "red",
    });
    return;
  }

  notifications.show({
    // title: error.data.message,
    message: parsedError.data.message,
    icon: <IconExclamationMark />,
    color: "red",
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: handleError,
      // refetchOnMount: false,
      // refetchOnWindowFocus: !import.meta.env.DEV,
    },
    mutations: {
      onError: handleError,
    },
  },
});

export default queryClient;
