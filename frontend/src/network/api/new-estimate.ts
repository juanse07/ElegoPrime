import api from "@/network/axiosInstance";
import { AxiosError } from "axios";

interface CreateNewEstimateValues {
    serviceType: string;
    zipCode: string;
    name: string;
    phone: string;
    ceilingHeight?: string;
    numberOfItems?: number;
    tvInches?: string;
    additionalInfo?: string;
    furnitureImageUrl?: string;
}

export async function createNewEstimate(input: CreateNewEstimateValues) {
    try {
        const response = await api.post('/api/new-service-request', input);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to create new estimate.');
        }
        throw error;
    }
}
/// Compare this snippet from frontend/src/network/api/BarService.ts:
