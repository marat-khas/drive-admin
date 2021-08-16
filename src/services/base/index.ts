import axios from 'axios';

import { API_URL } from '@constants/urls';

export const baseApi = axios.create({
    baseURL: API_URL,
    headers: {
        'X-Api-Factory-Application-Id': process.env.APPLICATION_ID,
    },
});
