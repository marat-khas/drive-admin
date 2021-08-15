import { ModelsStateDefault } from './default';
import { ModelsAction, ModelsActionTypes, ModelsState } from './types';

export const modelsReducer = (
    state = ModelsStateDefault,
    action: ModelsAction
): ModelsState => {
    switch (action.type) {
        case ModelsActionTypes.GET_MODELS_SUCCESS: {
            return {
                ...state,
                data: action.payload ? [...action.payload] : null,
            };
        }
        default:
            return state;
    }
};
