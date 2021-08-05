export interface UserState {
    auth: boolean;
}

export enum UserActionTypes {
    USER_AUTH = 'USER_AUTH',
}

export interface UserAuth {
    type: UserActionTypes.USER_AUTH;
    payload: boolean;
}

export type UserAction = UserAuth;
