import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { PasswordResetFormData } from "../types/users";

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
      })
    ),
  });

  const onSubmit = (data: PasswordResetFormData) => console.log(data);

  return (
    <Box component="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"xl"}>
        <Title order={2}>Reset Password</Title>
        <TextInput
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit">Login</Button>
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

export default ResetPasswordPage;
