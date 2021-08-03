import { User } from '@state/user/types';

export interface UserData {
    username: string;
    password: string;
    id: string;
}

export type RegisterRequest = Pick<UserData, 'username' | 'password'>;

export type RegisterResponse = UserData;

export type OauthRequest = Pick<UserData, 'username' | 'password'>;

export type OauthResponse = User;

export type RefreshRequest = {
    refresh_token: string;
};

export type RefreshResponse = User;

export type LogoutRequest = {
    access_token: string;
};

export type LogoutResponse = string;
