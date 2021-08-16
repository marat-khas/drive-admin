import {
    CHECK_URL,
    LOGOUT_URL,
    OAUTH_URL,
    REFRESH_URL,
    REGISTER_URL,
} from '@constants/urls';
import { baseApi } from '@services/base';

import {
    CheckRequest,
    CheckResponse,
    LogoutRequest,
    LogoutResponse,
    OauthRequest,
    OauthResponse,
    RefreshRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse,
} from './types';

export const register = ({
    username,
    password,
}: RegisterRequest): Promise<RegisterResponse> => {
    const headers = {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    };
    return baseApi
        .post(
            REGISTER_URL,
            {
                username,
                password,
            },
            {
                headers,
            }
        )
        .then((response) => response.data);
};

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

export const check = ({ access_token }: CheckRequest): Promise<CheckResponse> =>
    baseApi
        .get(CHECK_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
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
