import { createServiceRequest } from '@/network/api/new-serviceRequest';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaCheck, FaCouch, FaFan, FaHome, FaImage, FaLock, FaMusic, FaTools, FaTv, FaUpload } from 'react-icons/fa';
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
    imageUrl1: string | File;
    imageUrl2: string | File;
    requestedDate: string;
}

interface ApiError {
    response?: {
        status?: number;
        data?: unknown;
    };
}

interface NetworkInformation extends Navigator {
    connection?: {
        effectiveType: string;
        downlink: number;
    };
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
    const [showCamera, setShowCamera] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getServiceIcon = (type: string) => {
        switch (type) {
            case 'Fan/lamp ceiling mounting':
                return <FaFan className={styles.serviceTypeIcon} />;
            case 'Furniture/Murphy bed assembly':
                return <FaCouch className={styles.serviceTypeIcon} />;
            case 'Wall Fixture Setup':
                return <FaImage className={styles.serviceTypeIcon} />;
            case 'Tv install':
                return <FaTv className={styles.serviceTypeIcon} />;
            case 'Security':
                return <FaLock className={styles.serviceTypeIcon} />;
            case 'SoundBars/Videobeam':
                return <FaMusic className={styles.serviceTypeIcon} />;
            case 'Faucet/Toilet':
                return <FaTools className={styles.serviceTypeIcon} />;
            case 'Interior/Exterior Painting':
                return <FaTools className={styles.serviceTypeIcon} />;
            case 'Multiple services':
                return <FaHome className={styles.serviceTypeIcon} />;
            default:
                return null;
        }
    };


    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.serviceType) newErrors.serviceType = 'Service type is required'
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required for this service';
        
        // Conditional validation based on service type
        if (formData.serviceType === 'Fan/lamp ceiling mounting' && !formData.ceilingHeight) {
            newErrors.ceilingHeight = 'Ceiling height is required for this service';
        }
        if (formData.serviceType === 'Tv install' && !formData.tvInches) {
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

    const compressImage = async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new window.Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const compressedFile = new File([blob], file.name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now(),
                                });
                                resolve(compressedFile);
                            } else {
                                reject(new Error('Canvas to Blob conversion failed'));
                            }
                        },
                        'image/jpeg',
                        0.7  // compression quality
                    );
                };
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileUpload = async (file: File, fieldName: string) => {
        try {
            // Validate file type
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                throw new Error('Only JPEG and PNG images are allowed');
            }
            
            // Compress image before upload
            const compressedFile = await compressImage(file);
            console.log(`Original size: ${file.size / 1024 / 1024}MB, Compressed size: ${compressedFile.size / 1024 / 1024}MB`);
            
            // Create a preview URL for the compressed image
            const previewUrl = URL.createObjectURL(compressedFile);
            setPreviewUrls(prev => ({
                ...prev,
                [fieldName]: previewUrl
            }));

            // Store the compressed file
            setFormData(prev => ({
                ...prev,
                [fieldName]: compressedFile
            }));
            
        } catch (error) {
            console.error(`Error processing file:`, error);
            setErrors(prev => ({
                ...prev,
                [fieldName]: error instanceof Error ? error.message : 'Error processing file'
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                // Log device info to help with debugging
                console.log('Device Info:', {
                    userAgent: navigator.userAgent,
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    connection: (navigator as NetworkInformation).connection ? {
                        type: (navigator as NetworkInformation).connection?.effectiveType,
                        downlink: (navigator as NetworkInformation).connection?.downlink
                    } : 'Not available'
                });

                // Log file sizes before upload
                if (formData.imageUrl1 instanceof File) {
                    console.log('Image 1 size:', formData.imageUrl1.size / 1024 / 1024, 'MB');
                }
                if (formData.imageUrl2 instanceof File) {
                    console.log('Image 2 size:', formData.imageUrl2.size / 1024 / 1024, 'MB');
                }

                // Define a proper interface for the request data
                interface ServiceRequestData {
                    serviceType: string;
                    zipCode: string;
                    name: string;
                    phone: string;
                    ceilingHeight?: string;
                    numberOfItems?: number;
                    tvInches?: string;
                    additionalInfo?: string;
                    requestedDate?: string;
                    state: string;
                    imageUrl1?: File;
                    imageUrl2?: File;
                }
                
                // Prepare request data with all form values
                const requestData: ServiceRequestData = {
                    serviceType: formData.serviceType,
                    zipCode: formData.zipCode,
                    name: formData.name,
                    phone: formData.phone,
                    ceilingHeight: formData.ceilingHeight || undefined,
                    numberOfItems: formData.numberOfItems || undefined,
                    tvInches: formData.tvInches || undefined,
                    additionalInfo: formData.additionalInfo || undefined,
                    requestedDate: formData.requestedDate || undefined,
                    state: 'pending'
                };
                
                // Only add images if they are File objects
                if (formData.imageUrl1 instanceof File) {
                    requestData.imageUrl1 = formData.imageUrl1;
                }
                
                if (formData.imageUrl2 instanceof File) {
                    requestData.imageUrl2 = formData.imageUrl2;
                }

                console.log('Submitting service request:', {
                    ...requestData,
                    imageUrl1: formData.imageUrl1 instanceof File ? 
                        `File: ${formData.imageUrl1.name} (${formData.imageUrl1.size} bytes)` : formData.imageUrl1,
                    imageUrl2: formData.imageUrl2 instanceof File ? 
                        `File: ${formData.imageUrl2.name} (${formData.imageUrl2.size} bytes)` : formData.imageUrl2
                });
                
                const response = await createServiceRequest(requestData);
                console.log('Service request response:', response);
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
            } catch (error: unknown) {
                const apiError = error as ApiError;
                console.error('Submission Error Details:', {
                    type: error instanceof Error ? error.name : 'Unknown',
                    message: error instanceof Error ? error.message : String(error),
                    stack: error instanceof Error ? error.stack : undefined,
                    isNetworkError: error instanceof TypeError && error.message === 'Network Error',
                    status: apiError.response?.status,
                    responseData: apiError.response?.data
                });

                let errorMessage = 'Failed to submit the form. ';
                if (!navigator.onLine) {
                    errorMessage += 'Please check your internet connection.';
                } else if (error instanceof TypeError && error.message === 'Network Error') {
                    errorMessage += 'Network connection issue. Please try again.';
                } else if (apiError.response?.status === 413) {
                    errorMessage += 'Images are too large. Please use smaller images.';
                } else {
                    errorMessage += 'Please try again or use smaller images.';
                }

                setErrors(prev => ({
                    ...prev,
                    submit: errorMessage
                }));
                
                // Show user-friendly error
                alert(errorMessage);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };

    const showCeilingHeight = formData.serviceType === 'Fan/lamp ceiling mounting';
    const showTvInches = formData.serviceType === 'Tv install';
    const showNumberOfItems = ['Furniture/Murphy bed assembly', 'Wall Fixture Setup'].includes(formData.serviceType);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                } 
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setShowCamera(true);
        } catch (error) {
            console.error('Camera access error:', error);
            alert('Unable to access camera. Please check permissions or try uploading an image instead.');
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(videoRef.current, 0, 0);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
                    handleFileUpload(file, 'imageUrl1');
                }
            }, 'image/jpeg', 0.8);
            
            // Stop camera after capture
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            setShowCamera(false);
        }
    };

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
                            {['Fan/lamp ceiling mounting', 'Furniture/Murphy bed assembly', 'Wall Fixture Setup', 'Tv install', 'Security', 'SoundBars/Videobeam', 'Faucet/Toilet', 'Interior/Exterior Painting', 'Multiple services'].map((service) => (
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
                                    capture="environment"
                                    onClick={() => startCamera()}
                                />
                                <label htmlFor="imageUrl1" className={styles.fileInputLabel}>
                                    <FaUpload className={styles.uploadIcon} />
                                    <span>{formData.imageUrl1 ? 'Change Image' : 'Take Photo or Choose Image'}</span>
                                </label>
                                {previewUrls.imageUrl1 && (
                                    <div className={styles.imagePreview}>
                                        <Image 
                                            src={previewUrls.imageUrl1} 
                                            alt="Preview 1" 
                                            width={100}
                                            height={100}
                                            style={{ objectFit: 'cover' }}
                                        />
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
                                    capture="environment"
                                    onClick={() => startCamera()}
                                />
                                <label htmlFor="imageUrl2" className={styles.fileInputLabel}>
                                    <FaUpload className={styles.uploadIcon} />
                                    <span>{formData.imageUrl2 ? 'Change Image' : 'Take Photo or Choose Image'}</span>
                                </label>
                                {previewUrls.imageUrl2 && (
                                    <div className={styles.imagePreview}>
                                        <Image 
                                            src={previewUrls.imageUrl2} 
                                            alt="Preview 2" 
                                            width={100}
                                            height={100}
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <FaCheck className={styles.checkIcon} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {showCamera && (
                    <div className={styles.cameraContainer}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className={styles.cameraPreview}
                        />
                        <button 
                            type="button" 
                            onClick={capturePhoto}
                            className={styles.captureButton}
                        >
                            Take Photo
                        </button>
                        <button 
                            type="button" 
                            onClick={() => {
                                if (stream) {
                                    stream.getTracks().forEach(track => track.stop());
                                }
                                setShowCamera(false);
                            }}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                )}

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