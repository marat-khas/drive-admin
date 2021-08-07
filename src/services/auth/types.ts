import { User } from '@state/user/types';

export interface AccessData {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    user_id: string;
}

export type RegisterRequest = Pick<User, 'username' | 'password'>;

export type RegisterResponse = User;

export type OauthRequest = Pick<User, 'username' | 'password'>;

export type OauthResponse = AccessData;

export interface CheckRequest {
    access_token: string;
}

export type CheckResponse = Omit<User, 'password'>;

export type RefreshRequest = {
    refresh_token: string;
};

export type RefreshResponse = AccessData;

export type LogoutRequest = {
    access_token: string;
};

export type LogoutResponse = string;
