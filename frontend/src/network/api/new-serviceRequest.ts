import api from "@/network/axiosInstance";
import { AxiosError } from "axios";

interface ServiceRequestValues {
    serviceType: string;
    zipCode: string;
    name: string;
    phone: string;
    ceilingHeight?: string;
    numberOfItems?: number;
    tvInches?: string;
    additionalInfo?: string;
    imageUrl1?: File;
    imageUrl2?: File;
    requestedDate?: string;
    state?: string;
}

export async function createServiceRequest(input: ServiceRequestValues) {
    try {
        // Create a simple JSON object with all text data
        const jsonData = {
            serviceType: input.serviceType,
            zipCode: input.zipCode,
            name: input.name,
            phone: input.phone,
            ceilingHeight: input.ceilingHeight,
            numberOfItems: input.numberOfItems,
            tvInches: input.tvInches,
            additionalInfo: input.additionalInfo,
            requestedDate: input.requestedDate,
            state: input.state || 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Create FormData object
        const formData = new FormData();
        
        // Add the JSON data as a string field
        formData.append('data', JSON.stringify(jsonData));
        
        // Debug what files we're working with
        console.log('ImageUrl1:', input.imageUrl1 ? 
            `File: ${input.imageUrl1 instanceof File ? input.imageUrl1.name : 'Not a File object'}` : 
            'Not provided');
        console.log('ImageUrl2:', input.imageUrl2 ? 
            `File: ${input.imageUrl2 instanceof File ? input.imageUrl2.name : 'Not a File object'}` :
            'Not provided');
        
        // Add images if they exist - using consistent field names
        if (input.imageUrl1 instanceof File) {
            formData.append('image1', input.imageUrl1, input.imageUrl1.name);
            console.log(`Adding image1: ${input.imageUrl1.name} (${input.imageUrl1.size} bytes, ${input.imageUrl1.type})`);
        }
        
        if (input.imageUrl2 instanceof File) {
            formData.append('image2', input.imageUrl2, input.imageUrl2.name);
            console.log(`Adding image2: ${input.imageUrl2.name} (${input.imageUrl2.size} bytes, ${input.imageUrl2.type})`);
        }
        
        console.log('Sending form data with the following fields:');
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`- ${key}: File ${value.name} (${value.size} bytes, ${value.type})`);
            } else {
                console.log(`- ${key}: ${value}`);
            }
        }
        
        // Use axios with the correct content type
        console.log('Sending request to:', '/new-service-request');
        const response = await api.post('/new-service-request', formData, {
            headers: {
                // Let browser set the Content-Type header with boundary
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log('Response received:', response.status, response.statusText);
        console.log('Response data:', response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error submitting service request:', error);
        
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Failed to create service request';
            throw new Error(errorMessage);
        }
        
        throw error;
    }
}
/// Compare this snippet from frontend/src/network/api/BarService.ts:
