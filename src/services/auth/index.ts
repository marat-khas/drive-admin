import axios from 'axios';

import {
    API_URL,
    LOGOUT_URL,
    OAUTH_URL,
    REFRESH_URL,
    REGISTER_URL,
} from '@constants/urls';

import {
    LogoutRequest,
    LogoutResponse,
    OauthRequest,
    OauthResponse,
    RefreshRequest,
    RefreshResponse,
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

export const refresh = ({
    refresh_token,
}: RefreshRequest): Promise<RefreshResponse> =>
    baseApi
        .post(
            REFRESH_URL,
            {
                refresh_token,
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

export const logout = ({
    access_token,
}: LogoutRequest): Promise<LogoutResponse> =>
    baseApi
        .post(LOGOUT_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response) => response.data);
