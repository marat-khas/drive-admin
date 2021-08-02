export interface User {
    id: string;
    name: string;
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
