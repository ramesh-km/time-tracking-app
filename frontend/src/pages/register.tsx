import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../lib/zod-schemas";
import { RegisterFormData } from "../types/auth";
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

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => console.log(data);

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
        <TextInput
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit">Register</Button>

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
