// import { yupResolver } from "@hookform/resolvers/yup";
// import { Wine } from "lucide-react";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FormProvider, useForm } from "react-hook-form";
// import * as yup from "yup";

// import AddressInput from "@/components/AddressInput";
// import CustomGoldDatePicker from "@/components/DatePickerComponent";
// import FormInputField from "@/components/FormInputField";
// import LoadingButton from "@/components/LoadingButton";
// // import CustomNumberInput from "@/components/numberInputComponent";
// import ServiceSelector from "@/components/ServicesCheckBoxes";
// import * as BarServiceApi from "@/network/api/BarService";
// import styles from "@/styles/formStyle.module.css";

// const validationSchema = yup.object({
//     clientName: yup.string().required("Client name is required"),
//     companyName: yup.string().optional(),
//     email: yup.string().email("Invalid email").required("Email is required"),
//     phone: yup.string().optional().matches(/^\d+$/, "Phone number must contain only digits"),
//     address: yup.string().optional(),
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

// // Type for form data
// type BarServiceQuotationFormData = yup.InferType<typeof validationSchema>;

// export default function CreateQuotationPage() {
//     const router = useRouter();
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const methods = useForm<BarServiceQuotationFormData>({
//         resolver: yupResolver(validationSchema),
//         defaultValues: {
//         clientName: "",                // Required field defaults to an empty string
//         companyName: "",               // Optional field defaults to an empty string
//         email: "",                     // Required field
//         phone: "",                     // Optional field defaults to an empty string
//         address: "",                   // optional field defaults to an empty string
//         eventDate: undefined,          // Date defaults to undefined for easier handling
//         startTime: "",                 // Required field
//         endTime: "",                   // Required field
//         numberOfGuests: 1,             // Default minimum value
//         servicesRequested: [],         // Default to an empty array
//         notes: "",                
//         },
//     });

//     const { handleSubmit, formState: { errors }, setValue, watch } = methods;

//     function handleDateChange(date: Date | null, setValue: Function, fieldName: string) {
//         if (date) {
//             const isValidDate = !isNaN(date.getTime());
//             if (isValidDate) {
//                 setValue(fieldName, date, { shouldValidate: true });
//                 setShowDatePicker(false);
//             } else {
//                 setValue(fieldName, null, { shouldValidate: true });
//             }
//         } else {
//             setValue(fieldName, null, { shouldValidate: true });
//         }
//     }

//     async function onSubmit(data: BarServiceQuotationFormData) {
//         console.log("Form submitted with data:", data);
//         try {
//             setIsLoading(true); // Set loading state before API call
//             const formData = {
//                 ...data,
//                 servicesRequested: data.servicesRequested || [],
//                 companyName: data.companyName || undefined,
//                 phone: data.phone || undefined,
//                 notes: data.notes || undefined,
//                 address: data.address || "",
//             };

//             console.log("Sending data to API:", formData);
//             await BarServiceApi.createBarService(formData); // API call
//             console.log("API call successful");
//             alert("Quotation successfully created!");
//             router.push("/BarService/thankyou");
//         } catch (error) {
//             console.error("Error during API call:", error);
//             const errorMessage = error instanceof Error ? error.message : "Unknown error";
//             alert("Error creating quotation: " + errorMessage);
//         } finally {
//             setIsLoading(false); // Reset loading state
//         }
//     }

//     const timeOptions = Array.from({ length: 48 }, (_, i) => {
//         const hour = Math.floor(i / 2);
//         const minute = i % 2 === 0 ? "00" : "30";
//         const ampm = hour < 12 ? "AM" : "PM";
//         const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
//         return `${displayHour}:${minute} ${ampm}`;
//     });

//     return (
//         <div className="container px-4">
//             <Head>
//                 <title>Get in touch with us</title>
//             </Head>

//             <div className={`${styles.brand} py-4`}>
//                 <span className={`${styles.brandText} text-center text-3xl font-bold`}>
//                     Get in touch with us
//                 </span>
//             </div>

//             <FormProvider {...methods}>
//                 <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     <Row className="mb-4">
//                         <Col xs={12} md={6}>
//                             <FormInputField
//                                 register={methods.register("clientName")}
//                                 label="Client Name"
//                                 placeholder="e.g., John Doe"
//                                 error={errors.clientName}
//                             />
//                         </Col>
//                         <Col xs={12} md={6}>
//                             <FormInputField
//                                 register={methods.register("companyName")}
//                                 label="Company Name (Optional)"
//                                 placeholder="e.g., ABC Corp"
//                                 error={errors.companyName}
//                             />
//                         </Col>
//                     </Row>

//                     <Row className="mb-4">
//                         <Col xs={12} md={6}>
//                             <FormInputField
//                                 register={methods.register("email")}
//                                 label="Email"
//                                 placeholder="e.g., john.doe@example.com"
//                                 error={errors.email}
//                             />
//                         </Col>
//                         <Col xs={12} md={6}>
//                             <FormInputField
//                                 register={methods.register("phone")}
//                                 label="Phone (Optional)"
//                                 placeholder="e.g., 1234567890"
//                                 error={errors.phone}
//                             />
//                         </Col>
//                     </Row>

//                     <AddressInput
//           onAddressChange={(address) => methods.setValue("address", address, { shouldValidate: true })}
//         />

//                     <div className="mb-4">
//                         <label className="form-label">Event Date</label>
//                         <div
//                             className="form-control py-3 cursor-pointer"
//                             onClick={() => setShowDatePicker(true)}
//                         >
//                             {watch("eventDate")
//                                 ? new Date(watch("eventDate")).toLocaleDateString()
//                                 : "Select Date"}
//                         </div>
//                         <Modal show={showDatePicker} onHide={() => setShowDatePicker(false)} centered>
//                             <Modal.Header closeButton>
//                                 <Modal.Title>Select Event Date</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                                 <CustomGoldDatePicker
//                                     value={watch("eventDate")}
//                                     onChange={(date) => handleDateChange(date, setValue, "eventDate")}
//                                 />
//                             </Modal.Body>
//                         </Modal>
//                         {errors.eventDate && <div className="text-danger">{errors.eventDate.message}</div>}
//                     </div>

//                     <Row className="mb-4">
//                         <Col xs={12} md={6}>
//                             <label className="form-label">Start Time</label>
//                             <select {...methods.register("startTime")} className="form-select">
//                                 <option value="">Select Start Time</option>
//                                 {timeOptions.map((time) => (
//                                     <option key={time} value={time}>
//                                         {time}
//                                     </option>
//                                 ))}
//                             </select>
//                             {errors.startTime && <div className="text-danger">{errors.startTime.message}</div>}
//                         </Col>
//                         <Col xs={12} md={6}>
//                             <label className="form-label">End Time</label>
//                             <select {...methods.register("endTime")} className="form-select">
//                                 <option value="">Select End Time</option>
//                                 {timeOptions.map((time) => (
//                                     <option key={time} value={time}>
//                                         {time}
//                                     </option>
//                                 ))}
//                             </select>
//                             {errors.endTime && <div className="text-danger">{errors.endTime.message}</div>}
//                         </Col>
//                     </Row>

//                     <div className="mb-4">
//                         <CustomNumberInput
//                             value={watch("numberOfGuests")}
//                             onChange={(value) => setValue("numberOfGuests", value)}
//                             label="Number of Guests"
//                             min={1}
//                             max={1000}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <ServiceSelector
//                             name="servicesRequested"
//                             options={[
//                                 "Bartender",
//                                 "Barback",
//                                 "Cocktail Waitress/Waiter",
//                                 "Luxury Personal Mixologist Service",
//                             ]}
//                             multiple={true}
//                             label="Services Requested"
//                         />
//                         {errors.servicesRequested && (
//                             <p className="text-danger">{errors.servicesRequested.message}</p>
//                         )}
//                     </div>

//                     <div className="mb-4">
//                         <FormInputField
//                             register={methods.register("notes")}
//                             label="Notes (Optional)"
//                             placeholder="Additional notes"
//                             error={errors.notes}
//                             as="textarea"
//                             style={{ minHeight: "120px" }}
//                         />
//                     </div>

//                     <div className="mb-5">
//                         <LoadingButton
//                             className={`${styles.submitButton} w-100`}
//                             type="submit"
//                             isLoading={isLoading}
//                         >
//                             {isLoading ? "Submitting..." : "Request an Estimate"}
//                             {!isLoading && <Wine size={24} className="ms-2" />}
//                         </LoadingButton>
//                     </div>
//                 </Form>
//             </FormProvider>
//         </div>
//     );
// }
