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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Must be atleast 8 characters or more')
    .required('Confirm password is required'),
});

export const validateLogin = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const validateEvent = Yup.object({
  name: Yup.string()
    .max(25, 'Must be 25 letters or less')
    .required('Name event is required'),
  location: Yup.string()
    .max(25, 'Must be 25 letters or less')
    .required('Location event is required'),
  price: Yup.number('Must be number'),
  description: Yup.string()
    .min(8, 'Must be atleast 8 characters or more')
    .required('Description event is required'),
  eventType: Yup.string().required('Event type must be PAID or FREE'),
  categoryId: Yup.string().required('Category event is required'),
  startEvent: Yup.date().required('Start event is required'),
  endEvent: Yup.date().required('End event is required'),
  availableSeat: Yup.number().required('Available seat event is required'),
  // image: Yup.string().required('Image event is required'),
  image: Yup.string(),
});
