// Frontend/src/api/index.ts
import { Client } from './api-client'; // Import the single Client class

// Since you are using a direct Figma export without a bundler configuration, 
// we will just use the direct URL to your backend. 
// No process.env needed!
const API_BASE_URL = 'https://localhost:5267'; 

// Optional: If your NSwag generated client requires a custom fetch instance 
// (e.g., to inject JWT tokens), you can define it here.
const customFetch = {
    fetch: async (url: RequestInfo, init?: RequestInit) => {
        // You can add Authorization headers here later when you implement login
        return window.fetch(url, init);
    }
};

// Export a single instance of your API client to be used across the app
export const apiClient = new Client(API_BASE_URL, customFetch);