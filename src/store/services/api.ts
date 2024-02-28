import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = import.meta.env.VITE_SERVER_URL as string
export const API_KEY = import.meta.env.VITE_API_KEY as string
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL }),
    endpoints: () => ({}),
});


