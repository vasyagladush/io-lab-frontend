import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { signInSchema } from "../validation";
import { ContentCard } from "../components/ContentCard";
import { ErrorMessage, StyledButton, Wrapper } from "../styles";
import SignInForm from "./components/SignInForm";

import { useSignIn } from "./hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { NavigationAppRoutes } from "../../../constants/navigation-routes";

import { ButtonVariant, TypographyVariant } from "../../../components/ui-kit";

import { useUserContext } from "../../../contexts/UserContextProvider";
import { useAdminAccessCheck } from "../../private/hooks/useAdminAccessCheck";
interface FormValues {
  username: string;
  password: string;
}

const SignInModule: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  const usernameFormItem = watch("username");
  const passwordFormItem = watch("password");

  const { getUser } = useUserContext();
  const { signIn, loading, updateLoading } = useSignIn();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const { checkAdminAccess } = useAdminAccessCheck();

  const redirectAfterLogIn = (isAdmin: boolean) => {
    isAdmin
      ? navigate(NavigationAppRoutes.Private.Admin.INDEX)
      : navigate(NavigationAppRoutes.Private.Surveys.INDEX);
  };

  // const onPasswordForgot = () => {
  //   navigate(NavigationAppRoutes.Open.Auth.PASSWORD_RESET);
  // };

  const asyncCheck = async () => {
    const user = await getUser();
    if (user) {
      redirectAfterLogIn((await checkAdminAccess()) ?? false);
    }
  };
  useEffect(() => {
    asyncCheck();
  }, []);
  useEffect(() => {
    if (usernameFormItem || passwordFormItem) {
      setErrorMessage(null);
    }
  }, [usernameFormItem, passwordFormItem]);
  const onSubmit = async (values: FormValues) => {
    const { username, password } = values;
    try {
      const res = await signIn(username, password);
      if (res.user) redirectAfterLogIn(res.user.isAdmin);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error);
      updateLoading(false);
    }
  };

  return (
    <Wrapper>
      <ContentCard disableEndSession title="Sign in">
        {errorMessage && (
          <ErrorMessage variant={TypographyVariant.BODY2} color="#EF6355">
            Username/Password combination is incorrect
          </ErrorMessage>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <SignInForm control={control} />
          <StyledButton
            loading={loading}
            disabled={Object.keys(errors).length !== 0}
            fullWidth
            variant={ButtonVariant.CONTAINED}
            type="submit"
          >
            Sign in
          </StyledButton>
        </form>
      </ContentCard>
    </Wrapper>
  );
};

export default SignInModule;
