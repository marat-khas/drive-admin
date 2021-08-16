import { FilterStateDefault } from './default';
import { FilterAction, FilterActionTypes, FilterState } from './types';

export const FilterReducer = (
    state = FilterStateDefault,
    action: FilterAction
): FilterState => {
    switch (action.type) {
        case FilterActionTypes.ORDERS_FILTER_UPDATE: {
            return {
                ...state,
                orders: { ...state.orders, ...action.payload },
            };
        }
        case FilterActionTypes.CARS_FILTER_UPDATE: {
            return {
                ...state,
                cars: { ...state.cars, ...action.payload },
            };
        }
        default:
            return state;
    }
};
