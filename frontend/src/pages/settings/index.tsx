import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Anchor,
  Box,
  Button,
  Container,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { registerSchema } from "../../lib/zod-schemas";
import { RegisterFormData } from "../../types/users";
import { useDocumentTitle } from "@mantine/hooks";

export function Component() {
  useDocumentTitle("Settings");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => console.log(data);

  return (
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
        <TextInput
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />
        <TextInput
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit">Register</Button>
      </Stack>
    </Container>
  );
}
