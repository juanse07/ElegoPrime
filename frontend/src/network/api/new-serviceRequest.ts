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
    furnitureImageUrl?: string;
    requestedDate?: string;
    state?: string;
}

export async function createServiceRequest(input: ServiceRequestValues) {
    try {
        const response = await api.post('/new-service-request', {
            ...input,
            createdAt: new Date().toISOString(),
        });
        
        if (!response.data) {
            throw new Error('No data received from server');
        }
        
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('API Error Details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            if (error.response?.status === 404) {
                throw new Error('API endpoint not found. Please check your server configuration.');
            } else if (error.response?.status === 400) {
                throw new Error(error.response.data?.message || 'Invalid request data. Please check your input.');
            } else if (error.response?.status === 500) {
                throw new Error('Server error. Please try again later.');
            }
            
            throw new Error(error.response?.data?.message || 'Failed to create service request.');
        }
        throw error;
    }
}
/// Compare this snippet from frontend/src/network/api/BarService.ts:
