// import * as yup from 'yup';

// export const barServiceQuotationSchema = yup.object({
//     clientName: yup.string().required("Client name is required"),
//     companyName: yup.string().optional(),
//     email: yup.string().email("Email must be a valid email").required("Email is required"),
//     phone: yup.string().optional(),
//     address: yup.string().required("Address is required"),
//     eventDate: yup.date().required("Event date is required"),
//     startTime: yup.string().required("Start time is required"),
//     endTime: yup.string().required("End time is required"),
//     numberOfGuests: yup
//         .number()
//         .required("Number of guests is required")
//         .min(1, "At least one guest is required"),
//     servicesRequested: yup
//         .array()
//         .of(yup.string().required())
//         .min(1, "At least one service must be selected"),
//     notes: yup.string().optional(),
// });
