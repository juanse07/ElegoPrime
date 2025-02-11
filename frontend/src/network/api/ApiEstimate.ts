import { IEstimate } from "@/models/Estimate";
import api from "@/network/axiosInstance";
import { AxiosError } from "axios";
interface CreateBarServiceValues{
    
    clientName: string;
    companyName?: string;
    email: string;
    phone?: string;
    address: string;
    eventDate: Date;
    startTime: string;
    endTime: string;
    numberOfGuests: number;
    servicesRequested: string[] ;
    notes?: string;
    
    
    // Add this line
  
}
// Compare this snippet from backend/src/models/BarServiceQuotation.ts:
// export async function createBarService(input: CreateBarServiceValues) {
//     const response = await api.post<BarServiceQuotation>('/bar-service-quotations', input);
//     return response.data;
  
// }

export async function createBarService(input: CreateBarServiceValues) {
    try {
        const response = await api.post<IEstimate>('/bar-service-quotations', input);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to create bar service quotation.');
        }
        throw error;
    }
}