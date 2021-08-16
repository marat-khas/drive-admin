import { CategoriesStateDefault } from './default';
import {
    CategoriesAction,
    CategoriesActionTypes,
    CategoriesState,
} from './types';

export const categoriesReducer = (
    state = CategoriesStateDefault,
    action: CategoriesAction
): CategoriesState => {
    switch (action.type) {
        case CategoriesActionTypes.GET_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: action.payload,
            };
        }
        default:
            return state;
    }
};
