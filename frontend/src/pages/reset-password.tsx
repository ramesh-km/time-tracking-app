import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Alert,
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ResetPasswordFormData } from "../types/users";
import { resetLinkParamsSchema, resetPasswordSchema } from "../lib/zod-schemas";
import { IconLinkOff } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "../lib/react-query-keys";
import { resetPassword } from "../lib/api/users";
import { notifications } from "@mantine/notifications";

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: [mutationKeys.resetPassword],
    mutationFn: resetPassword,
    onSuccess: () => {
      notifications.show({
        title: "Password Reset",
        message: "Your password has been reset.",
        color: "teal",
      });
      navigate("/login");
    },
  });

  const [searchParams] = useSearchParams();
  const resetLinkData = resetLinkParamsSchema.safeParse({
    id: searchParams.get("id") ?? "",
    token: searchParams.get("token") ?? "",
  });
  console.log(
    "🚀 ~ file: reset-password.tsx:41 ~ ResetPasswordPage ~ resetLinkData:",
    resetLinkData
  );
  if (!resetLinkData.success) {
    return (
      <Stack>
        <Alert color="red" icon={<IconLinkOff />}>
          Invalid password reset link.
        </Alert>
        <Anchor size={"sm"} component={Link} to="/login">
          Go back to login.
        </Anchor>
        <Anchor size={"sm"} component={Link} to="/forgot-password">
          Request a new password reset link.
        </Anchor>
      </Stack>
    );
  }

  const onSubmit = (data: ResetPasswordFormData) => {
    mutation.mutate({
      ...data,
      token: resetLinkData.data.token,
      id: resetLinkData.data.id,
    });
  };

  return (
    <Box component="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"xl"}>
        <Title order={2}>Reset Password</Title>
        <PasswordInput
          label="New Password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" loading={mutation.isLoading}>
          Reset Password
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

export default ResetPasswordPage;
