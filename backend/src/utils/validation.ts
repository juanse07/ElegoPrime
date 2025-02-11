import mongoose from "mongoose";
import * as yup from "yup";

export const objectIdSchema =yup.string()
.test(
    "valid-object-id",                  
    "${path} is not a valid object ID",
    value => !value || mongoose.Types.ObjectId.isValid(value),
       
    
);
export const emailSchema = yup.string().email('Invalid email address');
export const phoneSchema = yup.string().matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number format');
export const nameSchema = yup.string().matches(/^[A-Za-z]+$/, 'Name must contain only letters');