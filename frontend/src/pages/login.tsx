import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../lib/zod-schemas";
import { LoginFormData } from "../types/auth";
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

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => console.log(data);

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
              <Anchor variant={"link"} component={Link} to="/reset-password">
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
