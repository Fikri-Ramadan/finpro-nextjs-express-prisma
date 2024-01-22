import * as Yup from 'yup';

export const validateRegister = Yup.object({
  username: Yup.string()
    .max(25, 'Must be 25 letters or less')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Must be atleast 8 characters or more')
    .required('Confirm password is required'),
});
