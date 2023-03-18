import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../lib/zod-schemas";
import { LoginFormData } from "../types/users";
import {
  Anchor,
  Box,
  Button,
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

function LoginPage() {
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
          {...register("email")}
        />
        <TextInput
          label="Password"
          error={errors.password?.message}
          {...register("password")}
          description={
            <Text size={"sm"}>
              Forgot your password?{" "}
              <Anchor variant={"link"} component={Link} to="/forgot-password">
                Reset
              </Anchor>
            </Text>
          }
          inputWrapperOrder={["label", "input", "error", "description"]}
        />
        <Button type="submit">Login</Button>
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
