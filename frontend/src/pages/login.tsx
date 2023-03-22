import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../lib/zod-schemas";
import { LoginFormData } from "../types/users";
import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "../lib/react-query-keys";
import useAuthCheck from "../hooks/useAuthCheck";
import { loginUser } from "../lib/api/users";
import useAuth from "../hooks/useAuth";
import { showNotification } from "@mantine/notifications";
import { IconExclamationMark } from "@tabler/icons-react";
import { useDocumentTitle } from "@mantine/hooks";

function LoginPage() {
  useDocumentTitle(`Time Tracker | Login`);

  useAuthCheck();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const mutation = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
    },
    onError: () => {
      showNotification({
        title: "Login Failed",
        message: "Invalid email or password.",
        color: "red",
        icon: <IconExclamationMark />,
        id: "login-failed",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <Box component="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"xl"}>
        <Title order={2}>Login</Title>
        <TextInput
          label="Email"
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />
        <PasswordInput
          label="Password"
          error={errors.password?.message}
          {...register("password")}
          autoComplete="current-password"
          description={
            <Text size={"sm"}>
              Forgot your password?{" "}
              <Anchor variant={"link"} component={Link} to="/forgot-password">
                Reset it.
              </Anchor>
            </Text>
          }
          inputWrapperOrder={["label", "input", "error", "description"]}
        />
        <Button type="submit" loading={mutation.isLoading}>
          Login
        </Button>
        <Stack spacing={"sm"}>
          <Text size={"sm"}>
            Don&apos;t have an account?{" "}
            <Anchor variant={"link"} component={Link} to="/register">
              Register.
            </Anchor>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default LoginPage;
