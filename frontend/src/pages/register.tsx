import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../lib/zod-schemas";
import { RegisterFormData } from "../types/users";
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
import { registerUser as registerUserApi } from "../lib/api/users";
import { mutationKeys } from "../lib/react-query-keys";
import useAuth from "../hooks/useAuth";
import useAuthCheck from "../hooks/useAuthCheck";

function RegisterPage() {
  useAuthCheck();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useAuth();
  const mutation = useMutation({
    mutationKey: [mutationKeys.register],
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      registerUser(data);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <Box component="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"xl"}>
        <Title order={2}>Register</Title>

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
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" loading={mutation.isLoading}>
          Register
        </Button>

        <Stack>
          <Text size={"sm"}>
            Already have an account?{" "}
            <Anchor variant={"link"} component={Link} to="/login">
              Login.
            </Anchor>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default RegisterPage;
