import { ApiQuery, Comment } from '@/types';

const API_BASE = 'http://127.0.0.1:11096/api';

export const api = {
    getStatus: async () => {
        const response = await fetch(API_BASE);
        return response.json();
    },

    query: async (params: ApiQuery) => {
        const queryString = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) queryString.append(key, value);
        });

        const response = await fetch(`${API_BASE}/query?${queryString}`);
        let res = response.json();
        return res;
    }
};
