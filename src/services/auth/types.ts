export interface UserData {
    username: string;
    password: string;
    id: string;
}

export interface AccessData {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    user_id: string;
}

export type RegisterRequest = Pick<UserData, 'username' | 'password'>;

export type RegisterResponse = UserData;

export type OauthRequest = Pick<UserData, 'username' | 'password'>;

export type OauthResponse = AccessData;

export interface CheckRequest {
    access_token: string;
}

export interface CheckResponse {
    username: string;
    id: string;
}

export type RefreshRequest = {
    refresh_token: string;
};

export type RefreshResponse = AccessData;

export type LogoutRequest = {
    access_token: string;
};

export type LogoutResponse = string;
