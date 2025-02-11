import { NewEstimate } from "@/models/newEstimate";
import api from "@/network/axiosInstance";
import { AxiosError } from "axios";
interface CreateNewEstimateValues{
    
    eventType: string;
    eventTypeOther?: string;
    guestCount: string;
    guestCountOther?: string;
    eventDate: Date;
    eventDateOther?: string;
    eventTime: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    eventLocation?: string;
    notes?: string;
    
    // Add this line
  
}

export async function createNewEstimate(input: CreateNewEstimateValues) {
    // const endpoint = process.env.NODE_ENV=== 'production'? '/api/new-estimate': '/new-estimates';

    try {
        const response = await api.post<NewEstimate>('/new-estimate', input);
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
