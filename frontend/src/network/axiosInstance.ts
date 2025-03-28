import axios from 'axios';

// Determine the correct API URL based on environment
const getBaseUrl = () => {
    // In the browser
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        
        // Check if we're on production domain
        if (hostname === 'elegoprime.com' || hostname === 'www.elegoprime.com') {
            return 'https://api.elegoprime.com';
        }
        
        // For localhost development
        return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    }
    
    // During SSR
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
    // Increase timeout for larger requests
    timeout: 30000, // 30 seconds
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
    console.log('API Request:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        headers: config.headers,
    });
    return config;
});

// Add response interceptor for logging
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', {
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        console.error('API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url,
        });
        throw error;
    }
);

export default api;