import { CarStateDefault } from './default';
import { CarAction, CarActionTypes, CarState } from './types';

export const carReducer = (
    state = CarStateDefault,
    action: CarAction
): CarState => {
    switch (action.type) {
        case CarActionTypes.CAR_GET: {
            return {
                ...state,
                car: { ...action.payload },
            };
        }
        case CarActionTypes.CAR_CHANGE: {
            return {
                ...state,
                car: state.car && { ...state.car, ...action.payload.data },
            };
        }
        default:
            return state;
    }
};
