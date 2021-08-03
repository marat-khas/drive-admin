export interface User {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    user_id: string;
}

export interface UserState {
    data: User | null;
}

export enum UserActionTypes {
    USER_AUTH = 'USER_AUTH',
}

export interface UserAuth {
    type: UserActionTypes.USER_AUTH;
    payload: User | null;
}

export type UserAction = UserAuth;
