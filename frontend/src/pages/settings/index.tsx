import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  PasswordInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { registerSchema, updateUserDataSchema } from "../../lib/zod-schemas";
import { RegisterFormData, UpdateUserData } from "../../types/users";
import { useDocumentTitle } from "@mantine/hooks";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "../../lib/react-query-keys";
import { notifications } from "@mantine/notifications";
import { updateUserData } from "../../lib/api/users";

export function Component() {
  useDocumentTitle("Settings");

  const auth = useAuth();
  const defaultValues = {
    name: auth.user?.name,
    email: auth.user?.email,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationKey: [mutationKeys.updateUserData],
    mutationFn: updateUserData,
    onSuccess: (data) => {
      auth.login(data);
      notifications.show({
        title: "Success",
        message: "Profile data updated successfully",
        color: "teal",
      });
    },
  });

  const onSubmit = (data: UpdateUserData) => {
    // Both current and new password should be provided or none of them
    if (
      (data.currentPassword && !data.newPassword) ||
      (!data.currentPassword && data.newPassword)
    ) {
      notifications.show({
        title: "Error",
        message: "Both current and new password should be provided",
        color: "red",
      });
      return;
    }

    mutation.mutate(data);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Stack>
          <TextInput
            label="Name"
            error={errors.name?.message}
            {...register("name")}
          />
          <TextInput
            label="Email"
            error={errors.email?.message}
            {...register("email")}
          />
          <PasswordInput
            label="Current Password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
            autoComplete="current-password"
          />
          <PasswordInput
            label="New Password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <Group>
            <Button
              loading={mutation.isLoading}
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Cancel
            </Button>
            <Button loading={mutation.isLoading} type="submit">
              Update
            </Button>
          </Group>
        </Stack>
      </Container>
    </form>
  );
}
