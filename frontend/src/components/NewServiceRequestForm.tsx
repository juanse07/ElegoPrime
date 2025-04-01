import { createServiceRequest } from '@/network/api/new-serviceRequest';
import axios from 'axios';
import { isValid, parseISO } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
    timeSlot: string;
}

interface BusyTimeSlot {
    _id: string;
    startTime: string;
    endTime: string;
    title: string;
    description: string;
    _localStartTime?: string;
    _localEndTime?: string;
    _startHour?: number;
    _endHour?: number;
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
        timeSlot: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<{[key: string]: string}>({});
    const [availableTimeSlots, setAvailableTimeSlots] = useState<{ time: string; isAvailable: boolean; conflictReason?: string }[]>([]);
    const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
    const [busyTimeSlots, setBusyTimeSlots] = useState<BusyTimeSlot[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [showDebugPanel, setShowDebugPanel] = useState(false);
    const [networkError, setNetworkError] = useState<string | null>(null);

    useEffect(() => {
        if (formData.requestedDate) {
            fetchBusyTimeSlots();
        }
    }, [formData.requestedDate]);

    const fetchBusyTimeSlots = async (retryCount = 0) => {
        setIsLoadingTimeSlots(true);
        try {
            setNetworkError(null); // Clear any previous errors
            // Create date object using date-fns for reliable parsing
            const selectedDate = parseISO(`${formData.requestedDate}T00:00:00.000Z`);
            
            // Create start/end with consistent UTC handling
            const startTime = new Date(selectedDate);
            startTime.setUTCHours(0, 0, 0, 0);
            
            const endTime = new Date(selectedDate);
            endTime.setUTCHours(23, 59, 59, 999);

            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                throw new Error('Backend URL is not configured');
            }

            const url = `${backendUrl}/busy-time-slots`;
            
            const response = await axios.get(url, {
                params: {
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString()
                },
                timeout: 10000, // Increased timeout for mobile networks
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            // Process response data...
            const processedBusySlots = response.data.map((slot: BusyTimeSlot) => ({
                ...slot,
                _localStartTime: new Date(slot.startTime).toLocaleString(),
                _localEndTime: new Date(slot.endTime).toLocaleString(),
                _startHour: new Date(slot.startTime).getHours(),
                _endHour: new Date(slot.endTime).getHours()
            }));
            
            setBusyTimeSlots(processedBusySlots);
            generateAvailableTimeSlots(processedBusySlots);
            
        } catch (error) {
            console.error('Error fetching busy time slots:', error);
            if (axios.isAxiosError(error)) {
                // Only show network error for persistent failures
                if (retryCount >= 2) {
                    if (error.code === 'ECONNABORTED') {
                        setNetworkError('Connection is slow. Please try again.');
                    } else if (error.message === 'Network Error') {
                        setNetworkError('Please check your connection and try again.');
                    }
                }
                
                // Retry logic with increased delay for mobile
                if (retryCount < 3) {
                    const delay = Math.pow(2, retryCount) * 2000; // Increased delay between retries
                    setTimeout(() => fetchBusyTimeSlots(retryCount + 1), delay);
                    return;
                }
            }
            // Set empty busy slots but don't show error on first attempts
            setBusyTimeSlots([]);
        } finally {
            setIsLoadingTimeSlots(false);
        }
    };

    const generateAvailableTimeSlots = (busySlots: BusyTimeSlot[]) => {
        const slots: { time: string; isAvailable: boolean; conflictReason?: string }[] = [];
        const startHour = 8;  // Start at 8 AM
        const endHour = 18;   // End at 6 PM
        
        // Selected date from form
        const selectedDate = new Date(formData.requestedDate);
        
        console.log('Generating time slots for date:', selectedDate.toDateString());
        
        // Generate all possible 30-minute time slots
        for (let hour = startHour; hour < endHour; hour++) {
            for (const minute of [0, 30]) {
                // Create time slot
                const slotDate = new Date(selectedDate);
                slotDate.setHours(hour, minute, 0, 0);
                
                // Format for display
                const timeString = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
                
                // Create slot end time (30 minutes after start)
                const slotEnd = new Date(slotDate);
                slotEnd.setMinutes(slotDate.getMinutes() + 30);
                
                // Check if this slot is busy (overlaps with any busy slot)
                let isSlotBusy = false;
                let conflictReason = '';
                
                for (const busySlot of busySlots) {
                    // Parse busy slot times from UTC time directly
                    const busyStart = new Date(busySlot.startTime);
                    const busyEnd = new Date(busySlot.endTime);
                    
                    // Get hours in UTC for comparison - matching the display logic
                    const busyStartHour = busyStart.getUTCHours();
                    const busyStartMinute = busyStart.getUTCMinutes();
                    const busyEndHour = busyEnd.getUTCHours();
                    const busyEndMinute = busyEnd.getUTCMinutes();
                    
                    console.log(`Checking slot ${timeString} against busy slot "${busySlot.title}":`, {
                        slotHour: hour,
                        slotMinute: minute,
                        busyStartHour,
                        busyStartMinute,
                        busyEndHour,
                        busyEndMinute
                    });
                    
                    // Check if this slot falls within the busy time
                    // Using the same UTC hour/minute logic as the display
                    const slotTimeInMinutes = (hour * 60) + minute;
                    const busyStartInMinutes = (busyStartHour * 60) + busyStartMinute;
                    const busyEndInMinutes = (busyEndHour * 60) + busyEndMinute;
                    
                    // Overlap if slot starts during busy time or spans into busy time
                    const overlaps = (
                        (slotTimeInMinutes >= busyStartInMinutes && slotTimeInMinutes < busyEndInMinutes) ||
                        ((slotTimeInMinutes + 30) > busyStartInMinutes && slotTimeInMinutes < busyEndInMinutes)
                    );
                    
                    if (overlaps) {
                        isSlotBusy = true;
                        conflictReason = busySlot.title;
                        console.log(`❌ Slot ${timeString} overlaps with ${busySlot.title} at ${busyStartHour}:${busyStartMinute} - ${busyEndHour}:${busyEndMinute}`);
                        break;
                    }
                }
                
                // Add the slot to our array
                slots.push({
                    time: timeString,
                    isAvailable: !isSlotBusy,
                    conflictReason: isSlotBusy ? conflictReason : undefined
                });
            }
        }
        
        console.log('Generated time slots:', slots);
        setAvailableTimeSlots(slots);
    };

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
        if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
        
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
                        timeSlot: '',
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

    const getDaysInMonth = (date: Date) => {
        const days: Date[] = [];
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Get first day of the month
        const firstDay = new Date(year, month, 1);
        // Get last day of the month
        const lastDay = new Date(year, month + 1, 0);

        // Add empty slots for days before the first day of the month
        const firstDayOfWeek = firstDay.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            const prevDate = new Date(year, month, -i);
            days.unshift(prevDate);
        }

        // Add all days of the month
        for (let d = 1; d <= lastDay.getDate(); d++) {
            days.push(new Date(year, month, d));
        }

        // Add empty slots for days after the last day of the month
        const lastDayOfWeek = lastDay.getDay();
        for (let i = 1; i < 7 - lastDayOfWeek; i++) {
            const nextDate = new Date(year, month + 1, i);
            days.push(nextDate);
        }

        return days;
    };

    const isDateAvailable = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        checkDate.setHours(0, 0, 0, 0);
        
        // Don't allow past dates
        if (checkDate < today) return false;
        
        // Only block Sundays (0)
        if (checkDate.getDay() === 0) return false;
        
        return true;
    };

    const handleDateSelect = (date: Date) => {
        // Format date in YYYY-MM-DD for the input value
        const formattedDate = date.toISOString().split('T')[0];
        
        // Log selected date for debugging
        console.log('Selected date:', {
            rawDate: date.toString(),
            formattedDate: formattedDate,
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
        });
        
        // Clear any previously selected time slot when date changes
        setFormData(prev => ({
            ...prev,
            requestedDate: formattedDate,
            timeSlot: '' // Reset time slot when date changes
        }));
    };

    const handleTimeSelect = (time: string) => {
        // Convert the time string to a full datetime for the selected date
        const [timeStr, period] = time.split(' ');
        const [hours, minutes] = timeStr.split(':');
        let hour = parseInt(hours);
        
        // Convert to 24-hour format if needed
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        const selectedDate = new Date(formData.requestedDate);
        selectedDate.setHours(hour, parseInt(minutes), 0, 0);

        handleChange({
            target: {
                name: 'timeSlot',
                value: time,
                type: 'time'
            }
        } as React.ChangeEvent<HTMLInputElement>);
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

                {formData.requestedDate && (
                    <div className={styles.appointmentSelector}>
                        <div className={styles.calendarSection}>
                            <div className={styles.calendarHeader}>
                                <button 
                                    className={styles.monthNavigator}
                                    onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)))}
                                    type="button"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                    </svg>
                                </button>
                                <h3 className={styles.monthDisplay}>
                                    {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button 
                                    className={styles.monthNavigator}
                                    onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)))}
                                    type="button"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                                    </svg>
                                </button>
                            </div>
                            
                            <div className={styles.weekDays}>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <span key={day} className={styles.weekDay}>{day}</span>
                                ))}
                            </div>

                            <div className={styles.calendar}>
                                {getDaysInMonth(selectedMonth).map((date, index) => (
                                    <button
                                        key={`${date.toISOString()}-${index}`}
                                        type="button"
                                        className={`
                                            ${styles.calendarDay}
                                            ${isDateAvailable(date) ? styles.available : styles.unavailable}
                                            ${formData.requestedDate === date.toISOString().split('T')[0] ? styles.selected : ''}
                                        `}
                                        onClick={() => handleDateSelect(date)}
                                        disabled={!isDateAvailable(date)}
                                    >
                                        <span className={styles.dayNumber}>{date.getDate()}</span>
                                        {isDateAvailable(date) && <span className={styles.availabilityDot}></span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {formData.requestedDate && (
                            <div className={styles.timeSection}>
                                <h4 className={styles.timeHeader}>
                                    Available Times
                                    <span className={styles.selectedDate}>
                                        {formData.requestedDate ? new Date(formData.requestedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : ''}
                                    </span>
                                </h4>
                                
                                {isLoadingTimeSlots ? (
                                    <div className={styles.loadingMessage}>Loading available time slots...</div>
                                ) : (
                                    <>
                                        {/* Display busy slots summary if there are any */}
                                        {busyTimeSlots.length > 0 && (
                                            <div className={styles.busySlotsInfo}>
                                                <p className={styles.unavailableMessage}>
                                                    Time slots marked in red are currently unavailable
                                                </p>
                                            </div>
                                        )}
                                        
                                        <div className={styles.timeGrid}>
                                            {availableTimeSlots.map((slot, index) => (
                                                <button
                                                    key={index}
                                                    className={`${styles.timeButton} ${
                                                        formData.timeSlot === slot.time ? styles.selected : ''
                                                    } ${!slot.isAvailable ? styles.unavailable : ''}`}
                                                    onClick={() => handleTimeSelect(slot.time)}
                                                    disabled={!slot.isAvailable}
                                                    title={slot.isAvailable ? 'Available' : slot.conflictReason ? `Not available: ${slot.conflictReason}` : 'This time slot is not available'}
                                                >
                                                    {slot.time}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

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
                                />
                                <label htmlFor="imageUrl2" className={styles.fileInputLabel}>
                                    <FaUpload className={styles.uploadIcon} />
                                    <span>{formData.imageUrl2 ? 'Change Image' : 'Choose Image'}</span>
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

                {networkError && (
                    <div className={styles.networkError}>
                        <p>{networkError}</p>
                        <button 
                            className={styles.retryButton}
                            onClick={() => fetchBusyTimeSlots()}
                        >
                            Retry Connection
                        </button>
                    </div>
                )}

                {/* Add debug panel toggle (only visible in development) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className={styles.debugSection}>
                        <button
                            type="button"
                            className={styles.debugToggle}
                            onClick={() => setShowDebugPanel(!showDebugPanel)}
                        >
                            {showDebugPanel ? 'Hide Debug Info' : 'Show Debug Info'}
                        </button>
                        
                        {showDebugPanel && (
                            <div className={styles.debugPanel}>
                                <h4>Debug Information</h4>
                                <div className={styles.debugRow}>
                                    <strong>Browser Timezone:</strong> {Intl.DateTimeFormat().resolvedOptions().timeZone}
                                </div>
                                <div className={styles.debugRow}>
                                    <strong>Timezone Offset:</strong> {new Date().getTimezoneOffset()} minutes
                                </div>
                                <div className={styles.debugRow}>
                                    <strong>Selected Date:</strong> {formData.requestedDate}
                                </div>
                                {formData.requestedDate && (
                                    <>
                                        <div className={styles.debugRow}>
                                            <strong>Date Object:</strong> {new Date(formData.requestedDate).toString()}
                                        </div>
                                        <div className={styles.debugRow}>
                                            <strong>Date-fns Parsed:</strong> {parseISO(`${formData.requestedDate}T00:00:00.000Z`).toString()}
                                        </div>
                                    </>
                                )}
                                <h5>Busy Slots:</h5>
                                {busyTimeSlots.length > 0 ? (
                                    <div className={styles.debugTable}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Raw Start</th>
                                                    <th>Raw End</th>
                                                    <th>Parsed Start</th>
                                                    <th>Parsed End</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {busyTimeSlots.map(slot => {
                                                    const startDate = parseISO(slot.startTime);
                                                    const endDate = parseISO(slot.endTime);
                                                    return (
                                                        <tr key={slot._id}>
                                                            <td>{slot.title}</td>
                                                            <td>{slot.startTime}</td>
                                                            <td>{slot.endTime}</td>
                                                            <td>{isValid(startDate) ? startDate.toString() : 'Invalid'}</td>
                                                            <td>{isValid(endDate) ? endDate.toString() : 'Invalid'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div>No busy slots for this date</div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
} 