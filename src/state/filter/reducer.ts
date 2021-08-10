import { FilterStateDefault } from './default';
import { FilterAction, FilterActionTypes, FilterState } from './types';

export const FilterReducer = (
    state = FilterStateDefault,
    action: FilterAction
): FilterState => {
    switch (action.type) {
        case FilterActionTypes.FILTER_UPDATE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
};
