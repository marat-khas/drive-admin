export interface User {
    username: string;
    id: string;
    password: string;
}

export interface UserState {
    data: Omit<User, 'password'> | null;
}

export enum UserActionTypes {
    USER_AUTH = 'USER_AUTH',
}

export interface UserAuth {
    type: UserActionTypes.USER_AUTH;
    payload: Omit<User, 'password'> | null;
}

export type UserAction = UserAuth;
