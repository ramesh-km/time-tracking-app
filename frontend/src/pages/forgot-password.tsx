import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ForgotPasswordFormData } from "../types/users";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "../lib/react-query-keys";
import { forgotPassword } from "../lib/api/users";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
      })
    ),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: [mutationKeys.forgotPassword],
    mutationFn: forgotPassword,
    onSuccess: () => {
      notifications.show({
        title: "Password Reset Email Sent",
        message: "Check your email for a password reset link.",
        color: "teal",
        icon: <IconCheck />,
      });
    },
  });

  if (mutation.isSuccess) {
    return <Alert>Check your email for a password reset link.</Alert>;
  }

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutation.mutate(data.email);
  };

  return (
    <Box component="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"xl"}>
        <Title order={2}>Forgot Password</Title>
        <TextInput
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" loading={mutation.isLoading}>
          Send Reset Password Email
        </Button>
        <Stack spacing={"sm"}>
          <Text size={"sm"}>
            Go back to{" "}
            <Anchor variant={"link"} component={Link} to="/login">
              Login.
            </Anchor>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ForgotPasswordPage;
