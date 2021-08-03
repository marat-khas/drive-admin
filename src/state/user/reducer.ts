import { UserStateDefault } from './default';
import { UserAction, UserActionTypes, UserState } from './types';

export const UserReducer = (
    state = UserStateDefault,
    action: UserAction
): UserState => {
    switch (action.type) {
        case UserActionTypes.USER_AUTH: {
            return {
                ...state,
                data: action.payload ? { ...action.payload } : null,
            };
        }
        default:
            return state;
    }
};
