import * as yup from 'yup';

export const nameSchema = yup.string()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters');

export const emailSchema = yup.string()
  .email('Invalid email address')
  .required('Email is required');

export const phoneSchema = yup.string()
  .matches(/^[0-9-+\s()]*$/, 'Invalid phone number')
  .min(10, 'Phone number must be at least 10 digits')
  .optional(); 