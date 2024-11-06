// export const API_BASE = 'https://safc.framist.top/api'; // TODO: 正式部署时需要视情况修改
export const API_BASE = 'http://127.0.0.1:11096/api';

import { ApiQuery } from '@/types';


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
        const res = response.json();
        return res;
    }
};
