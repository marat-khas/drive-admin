import { User, UserActionTypes, UserAuth } from './types';

export const UserAuthAction = (data: User | null): UserAuth => ({
    type: UserActionTypes.USER_AUTH,
    payload: data,
});
