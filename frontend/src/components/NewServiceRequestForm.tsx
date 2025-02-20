import { createServiceRequest } from '@/network/api/new-serviceRequest';
import { useState } from 'react';
import { FaCheck, FaCouch, FaImage, FaTools, FaTv, FaUpload } from 'react-icons/fa';
import styles from '../styles/NewServiceRequestForm.module.css';

interface FormData {
    serviceType: string;
    zipCode: string;
    name: string;
    phone: string;
    ceilingHeight: string;
    numberOfItems: number;
    tvInches: string;
    additionalInfo: string;
    state: string;
    imageUrl1: string;
    imageUrl2: string;
    requestedDate: string;
}

export default function NewServiceRequestForm() {
    const [formData, setFormData] = useState<FormData>({
        serviceType: '',
        zipCode: '',
        name: '',
        phone: '',
        ceilingHeight: '',
        numberOfItems: 0,
        tvInches: '',
        additionalInfo: '',
        state: 'pending',
        imageUrl1: '',
        imageUrl2: '',
        requestedDate: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<{[key: string]: string}>({});

    const getServiceIcon = (type: string) => {
        switch (type) {
            case 'Fan/lamp ceiling mounting':
                return <FaTools className={styles.serviceTypeIcon} />;
            case 'Furniture assembly':
                return <FaCouch className={styles.serviceTypeIcon} />;
            case 'Hanging pictures and shelves':
                return <FaImage className={styles.serviceTypeIcon} />;
            case 'TV mounting':
                return <FaTv className={styles.serviceTypeIcon} />;
            default:
                return null;
        }
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        
        // Conditional validation based on service type
        if (formData.serviceType === 'Fan/lamp ceiling mounting' && !formData.ceilingHeight) {
            newErrors.ceilingHeight = 'Ceiling height is required for this service';
        }
        if (formData.serviceType === 'TV mounting' && !formData.tvInches) {
            newErrors.tvInches = 'TV size is required for this service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        
        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            
            if (file) {
                handleFileUpload(file, name);
            }
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when field is modified
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleFileUpload = async (file: File, fieldName: string) => {
        try {
            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setPreviewUrls(prev => ({
                ...prev,
                [fieldName]: previewUrl
            }));

            // For now, we'll just store the file name
            setFormData(prev => ({
                ...prev,
                [fieldName]: file.name
            }));
        } catch (error) {
            console.error(`Error uploading file to ${fieldName}:`, error);
            setErrors(prev => ({
                ...prev,
                [fieldName]: 'Error uploading file'
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                const requestData = {
                    serviceType: formData.serviceType,
                    zipCode: formData.zipCode,
                    name: formData.name,
                    phone: formData.phone,
                    ceilingHeight: formData.ceilingHeight || undefined,
                    numberOfItems: formData.numberOfItems || undefined,
                    tvInches: formData.tvInches || undefined,
                    additionalInfo: formData.additionalInfo || undefined,
                    furnitureImageUrl: formData.imageUrl1 || undefined,
                    requestedDate: formData.requestedDate || undefined,
                    state: 'pending'
                };

                const response = await createServiceRequest(requestData);
                console.log('Service request submitted:', response);
                setSubmitSuccess(true);

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        serviceType: '',
                        zipCode: '',
                        name: '',
                        phone: '',
                        ceilingHeight: '',
                        numberOfItems: 0,
                        tvInches: '',
                        additionalInfo: '',
                        state: 'pending',
                        imageUrl1: '',
                        imageUrl2: '',
                        requestedDate: '',
                    });
                    setPreviewUrls({});
                    setSubmitSuccess(false);
                }, 3000);
            } catch (error) {
                console.error('Error submitting form:', error);
                const errorMessage = error instanceof Error ? error.message : 'Failed to submit service request. Please try again.';
                setErrors(prev => ({
                    ...prev,
                    submit: errorMessage
                }));
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };

    const showCeilingHeight = formData.serviceType === 'Fan/lamp ceiling mounting';
    const showTvInches = formData.serviceType === 'TV mounting';
    const showNumberOfItems = ['Furniture assembly', 'Hanging pictures and shelves'].includes(formData.serviceType);

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Request a Service</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={`${styles.label} ${styles.requiredField}`}>
                            Service Type
                        </label>
                        <select
                            name="serviceType"
                            className={styles.select}
                            value={formData.serviceType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a service</option>
                            {['Fan/lamp ceiling mounting', 'Furniture assembly', 'Hanging pictures and shelves', 'TV mounting'].map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>
                        {formData.serviceType && (
                            <div className={styles.selectedServiceIcon}>
                                {getServiceIcon(formData.serviceType)}
                            </div>
                        )}
                        {errors.serviceType && (
                            <div className={styles.errorMessage}>{errors.serviceType}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={`${styles.label} ${styles.requiredField}`}>
                            Zip Code
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            className={styles.input}
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            placeholder="Enter your zip code"
                        />
                        {errors.zipCode && (
                            <div className={styles.errorMessage}>{errors.zipCode}</div>
                        )}
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={`${styles.label} ${styles.requiredField}`}>
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <div className={styles.errorMessage}>{errors.name}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={`${styles.label} ${styles.requiredField}`}>
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            className={styles.input}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="(123) 456-7890"
                        />
                        {errors.phone && (
                            <div className={styles.errorMessage}>{errors.phone}</div>
                        )}
                    </div>
                </div>

                {showCeilingHeight && (
                    <div className={`${styles.formGroup} ${styles.conditionalField} ${styles.visible}`}>
                        <label className={styles.label}>
                            Ceiling Height
                        </label>
                        <input
                            type="text"
                            name="ceilingHeight"
                            className={styles.input}
                            value={formData.ceilingHeight}
                            onChange={handleChange}
                            placeholder="e.g., 8 feet"
                        />
                        {errors.ceilingHeight && (
                            <div className={styles.errorMessage}>{errors.ceilingHeight}</div>
                        )}
                    </div>
                )}

                {showNumberOfItems && (
                    <div className={`${styles.formGroup} ${styles.conditionalField} ${styles.visible}`}>
                        <label className={styles.label}>
                            Number of Items
                        </label>
                        <input
                            type="number"
                            name="numberOfItems"
                            className={styles.input}
                            value={formData.numberOfItems}
                            onChange={handleChange}
                            min="1"
                            placeholder="Enter number of items"
                        />
                    </div>
                )}

                {showTvInches && (
                    <div className={`${styles.formGroup} ${styles.conditionalField} ${styles.visible}`}>
                        <label className={styles.label}>
                            TV Size (inches)
                        </label>
                        <input
                            type="text"
                            name="tvInches"
                            className={styles.input}
                            value={formData.tvInches}
                            onChange={handleChange}
                            placeholder="e.g., 55 inches"
                        />
                        {errors.tvInches && (
                            <div className={styles.errorMessage}>{errors.tvInches}</div>
                        )}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Requested Date
                    </label>
                    <input
                        type="date"
                        name="requestedDate"
                        className={styles.input}
                        value={formData.requestedDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Additional Information
                    </label>
                    <textarea
                        name="additionalInfo"
                        className={styles.input}
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Add any additional details about your service request...for instance, if you have a link to the product you want to be installed, please include it here."
                    />
                </div>

                <div className={styles.imageUploadSection}>
                    <h3 className={styles.sectionTitle}>
                        <FaImage className={styles.sectionIcon} /> Would you like to upload images?
                        <span className={styles.optionalText}>(Optional)</span>
                    </h3>
                    <p className={styles.sectionDescription}>
                        Upload up to 2 images to help us better understand your service needs
                    </p>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Image 1
                            </label>
                            <div className={styles.fileInputWrapper}>
                                <input
                                    type="file"
                                    name="imageUrl1"
                                    id="imageUrl1"
                                    className={styles.fileInput}
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                                <label htmlFor="imageUrl1" className={styles.fileInputLabel}>
                                    <FaUpload className={styles.uploadIcon} />
                                    <span>{formData.imageUrl1 ? 'Change Image' : 'Choose Image'}</span>
                                </label>
                                {previewUrls.imageUrl1 && (
                                    <div className={styles.imagePreview}>
                                        <img src={previewUrls.imageUrl1} alt="Preview 1" />
                                        <FaCheck className={styles.checkIcon} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Image 2
                            </label>
                            <div className={styles.fileInputWrapper}>
                                <input
                                    type="file"
                                    name="imageUrl2"
                                    id="imageUrl2"
                                    className={styles.fileInput}
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                                <label htmlFor="imageUrl2" className={styles.fileInputLabel}>
                                    <FaUpload className={styles.uploadIcon} />
                                    <span>{formData.imageUrl2 ? 'Change Image' : 'Choose Image'}</span>
                                </label>
                                {previewUrls.imageUrl2 && (
                                    <div className={styles.imagePreview}>
                                        <img src={previewUrls.imageUrl2} alt="Preview 2" />
                                        <FaCheck className={styles.checkIcon} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>

                {submitSuccess && (
                    <div className={styles.successMessage}>
                        Your service request has been submitted successfully!
                    </div>
                )}
            </form>
        </div>
    );
} 