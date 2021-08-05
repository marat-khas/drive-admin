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
                auth: action.payload,
            };
        }
        default:
            return state;
    }
};
