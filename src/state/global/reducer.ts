import { GlobalStateDefault } from './default';
import { GlobalAction, GlobalActionTypes, GlobalState } from './types';

export const GlobalReducer = (
    state = GlobalStateDefault,
    action: GlobalAction
): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.LOADING_START: {
            return {
                ...state,
                loading: [...state.loading, action.payload],
            };
        }
        case GlobalActionTypes.LOADING_END: {
            return {
                ...state,
                loading: [
                    ...state.loading.filter(
                        (process) => process !== action.payload
                    ),
                ],
            };
        }
        case GlobalActionTypes.MODAL_SHOW: {
            return {
                ...state,
                modal: { ...action.payload },
            };
        }
        case GlobalActionTypes.MODAL_HIDE: {
            return {
                ...state,
                modal: null,
            };
        }
        default:
            return state;
    }
};
