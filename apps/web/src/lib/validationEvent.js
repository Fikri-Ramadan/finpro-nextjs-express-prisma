import * as Yup from 'yup';

export const validateEvent = Yup.object({
  name: Yup.string()
    .max(25, 'Must be 25 letters or less')
    .required('Name event is required'),
  location: Yup.string()
    .max(25, 'Must be 25 letters or less')
    .required('Location event is required'),
  price: Yup.number().required('Price event is required'),
  description: Yup.string()
    .min(8, 'Must be atleast 8 characters or more')
    .required('Description event is required'),
  eventType: Yup.string().required('Event type must be PAID or FREE'),
  category: Yup.string().required('Category event is required'),
  startEvent: Yup.date().required('Start event is required'),
  endEvent: Yup.date().required('End event is required'),
  availableSeat: Yup.number().required('Available seat event is required'),
  image: Yup.string().required('Image event is required'),
});
