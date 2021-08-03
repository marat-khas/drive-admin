import axios from 'axios';

import { API_URL, OAUTH_URL, REGISTER_URL } from '@constants/urls';

import {
    OauthRequest,
    OauthResponse,
    RegisterRequest,
    RegisterResponse,
} from './types';

const baseApi = axios.create({
    baseURL: API_URL,
    headers: {
        'X-Api-Factory-Application-Id': process.env.APPLICATION_ID,
    },
});

export const register = ({
    username,
    password,
}: RegisterRequest): Promise<RegisterResponse> =>
    baseApi
        .post(
            REGISTER_URL,
            {
                username,
                password,
            },
            {
                headers: {
                    username: process.env.USERNAME,
                    password: process.env.PASSWORD,
                },
            }
        )
        .then((response) => response.data);

export const oauth = ({
    username,
    password,
}: OauthRequest): Promise<OauthResponse> =>
    baseApi
        .post(
            OAUTH_URL,
            {
                username,
                password,
            },
            {
                headers: {
                    Authorization: `Basic ${btoa(
                        `random:${process.env.SECRET}`
                    )}`,
                },
            }
        )
        .then((response) => response.data);
