export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "EmailError";
  }

  if (!(values.password.length >= 8 && values.password.length < 28)) {
    errors.password = "PasswordError";
  }

  return errors;
}

function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}
export { validateSignin };
